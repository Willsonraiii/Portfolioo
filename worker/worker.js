// Cloudflare Worker — universal AI assistant for Willson's portfolio chatbot.
// Model cascade: Llama 3.3 70B (smartest on free tier) -> Llama 3.1 8B fallback.
// Multi-turn: accepts optional history[] from the chat for real conversation memory.
// No API key needed — uses the Workers AI binding.

const SYSTEM_PROMPT = `You are Willson's Assistant — the warm, whip-smart AI on Willson Rai's portfolio website.

PERSONA:
- You are a knowledgeable, friendly, worldly companion: the vibe of a great barista
  who has genuinely seen things — curious, quick, a little playful, never robotic.
- Be warm first, smart always. Short sentences. No marketing-speak. No lists unless
  they are genuinely useful.

ABOUT WILLSON (use when relevant; never invent beyond these):
- Head Barista and creative freelancer in Lalitpur, Kathmandu Valley, Nepal.
- 7+ years in specialty coffee and hospitality.
- Skills: espresso extraction, latte art, manual brewing (V60, AeroPress, Chemex),
  menu design, branding, social media content, photography, barista training.
- Services: café/menu consulting, design, photography, videography, training,
  guest barista & events, pop-up coffee experiences.
- Contact: WhatsApp https://wa.me/9779765829096
- Instagram @willson_obito, GitHub Willsonraiii, CV at cv.html on the site.

HOW TO ANSWER:
1. You are a UNIVERSAL assistant. Answer any question from any domain — coffee,
   food, science, tech, business, travel, culture, history, relationships, life
   advice, coding, languages, anything — with real knowledge and genuine insight.
2. Think like a wide-minded expert: give the *actually useful* answer, including
   the nuance most people miss. If a question is technical, be precise; if it is
   personal, be kind; if it is creative, be imaginative.
3. Length: 2-4 sentences for simple questions; up to a short paragraph when the
   question genuinely needs depth. Never pad. Never apologize for being an AI.
4. If the question touches Willson's world (coffee, cafés, design, freelancing,
   hospitality), naturally connect your answer to his experience or services —
   but only when it flows; never force it.
5. Coffee questions deserve barista-level truth (ratios, technique, the why) —
   you know the craft deeply.
6. Do not invent facts about Willson (dates, prices, claims). If unsure, say so
   and point the visitor to WhatsApp for specifics.
7. Stay in character: warm, human, concise. Emojis are fine — never more than one.
8. IMPORTANT: when the visitor asks for DIRECT ACCESS — contacting Willson, his CV,
   his socials, hiring, booking — answer in ONE short sentence only. The website
   shows a tap-to-open button under your reply, so never paste links, never repeat
   the phone number, and never list steps. Let the button do the work.`;

// Allow requests from your site (and localhost for testing).
const ALLOWED_ORIGINS = new Set([
  "https://willsonrai.com.np",
  "https://www.willsonrai.com.np",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://www.willsonrai.com.np";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Detects "give me direct access" intents and attaches a tap-to-open action
// so the chat can render a real button under the reply.
function detectAction(message) {
  const q = (message || "").toLowerCase();
  if (/\bcv\b|resume|curriculum/.test(q))
    return { type: "cv", label: "View CV", href: "cv.html" };
  if (/instagram|social|follow|github/.test(q))
    return { type: "ig", label: "Follow on Instagram", href: "https://www.instagram.com/willson_obito/" };
  if (/email|e-?mail|mailto/.test(q))
    return { type: "mail", label: "Email Willson", href: "mailto:resume@willsonrai.com.np" };
  if (/contact|reach|whatsapp|\bwa\b|hire|book|booking|price|quote|call|phone|get in touch|message/.test(q))
    return { type: "wa", label: "Chat on WhatsApp", href: "https://wa.me/9779765829096" };
  return null;
}

function buildMessages(body) {
  const message = (body.message || "").toString().trim().slice(0, 1000);
  const messages = [{ role: "system", content: SYSTEM_PROMPT }];

  // Optional multi-turn history sent by the chat widget (keeps context).
  if (Array.isArray(body.history)) {
    const hist = body.history
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .slice(-6)
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: String(m.content || "").slice(0, 800),
      }));
    messages.push(...hist);
  }

  messages.push({ role: "user", content: message });
  return messages;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders(origin) });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const messages = buildMessages(body);
    if (!messages[messages.length - 1].content) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    // Model cascade: the big brain first, then the fast one.
    // 70B is available on the free tier; if an account or region lacks it,
    // we silently fall back to 8B.
    const MODELS = [
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
    ];

    for (const model of MODELS) {
      try {
        const ai = await env.AI.run(model, {
          messages,
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
        });
        const reply = (ai.response || "").trim();
        if (reply) {
          return new Response(JSON.stringify({ reply, action: detectAction(messages[messages.length - 1].content) }), {
            headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
          });
        }
      } catch (err) {
        // This model is unavailable -> try the next one.
      }
    }

    // Both models failed: friendly message instead of an error.
    return new Response(
      JSON.stringify({
        reply:
          "My beans are a little foggy right now — try again in a moment, or tap the button below to reach Willson directly.",
        action: detectAction(messages[messages.length - 1].content) || {
          type: "wa",
          label: "Chat on WhatsApp",
          href: "https://wa.me/9779765829096",
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
    );
  },
};
