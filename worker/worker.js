// Cloudflare Worker — free AI backend for Willson's portfolio chatbot.
// Uses Workers AI (free tier) instead of a paid API. No API key needed —
// Cloudflare provisions AI access automatically once the "AI" binding is added.

const SYSTEM_PROMPT = `You are the friendly assistant on Willson Rai's portfolio website.
Willson Rai is a Head Barista and creative freelancer based in Lalitpur, Kathmandu
Valley, Nepal, with 7+ years of experience in coffee and hospitality. Outside the
bar he designs menus, creates social media content, and builds brand identities
for cafés and small businesses.

Contact: WhatsApp at https://wa.me/9779765829096
CV: available on the site at cv.html
Social: Instagram @willson_obito, GitHub Willsonraiii

Answer visitor questions about Willson's work, skills, experience, and how to
reach him. Keep answers short — 2 to 4 sentences. Be warm and conversational.
If asked something totally unrelated to Willson or his work, you can still help,
but gently steer back to how it might relate to his portfolio when it makes sense.
Never invent specific dates, prices, or claims not given above — if unsure, say so
and point the visitor to WhatsApp for specifics.`;

// Allow requests from your site (and localhost for testing). Update the
// production origin below if your domain changes.
const ALLOWED_ORIGINS = new Set([
  "https://willsonrai.com.np",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://willsonrai.com.np";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
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

    const message = (body.message || "").toString().trim().slice(0, 500);
    if (!message) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    try {
      // Free Workers AI model. Small, fast, good enough for a portfolio chatbot.
      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 300,
      });

      const reply = aiResponse.response || "Sorry, I couldn't come up with an answer to that.";

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "AI request failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }
  },
};
