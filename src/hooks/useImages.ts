import { useEffect, useState } from "react";

// The original portfolio is a single self-contained index.html on GitHub with all
// images embedded as base64 data URIs (no separate image files exist). We load that
// exact file (via the CORS-enabled jsDelivr CDN) and pull the identical image bytes
// out at runtime so the photos stay byte-for-byte the same while we redesign the UI
// around them.
const ORIGINAL_URL = "https://cdn.jsdelivr.net/gh/Willsonraiii/Portfolioo@main/index.html";

export type ImageState = {
  hero: string | null;
  gallery: string[];
  status: "loading" | "ready" | "error";
};

/** Pull a base64 data URI from either an <img src> or an inline background-image. */
function dataFrom(el: Element): string {
  const src = el.getAttribute("src");
  if (src && src.startsWith("data:image")) return src;
  const bg = (el as HTMLElement).style?.backgroundImage ?? "";
  const match = bg.match(/data:image\/[^;]+;base64,[^"')]+/);
  return match ? match[0] : "";
}

/** Collect every inlined data image within a root element, in document order. */
function collectImages(root: Element | null): string[] {
  if (!root) return [];
  const nodes = Array.from(
    root.querySelectorAll('img, [style*="data:image"], [style*="data%3Aimage"]')
  );
  return nodes.map(dataFrom).filter(Boolean);
}

export function useImages(): ImageState {
  const [state, setState] = useState<ImageState>({
    hero: null,
    gallery: [],
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(ORIGINAL_URL, { cache: "force-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const hero = collectImages(doc.querySelector("#hero"))[0] ?? null;

        let gallery = collectImages(doc.querySelector("#gallery"));
        if (gallery.length === 0) {
          // Defensive fallback: every inlined image in the document except the hero.
          gallery = collectImages(doc.body).filter((src) => src !== hero);
        }

        if (cancelled) return;
        setState({
          hero,
          gallery,
          status: gallery.length || hero ? "ready" : "error",
        });
      } catch {
        if (!cancelled) setState({ hero: null, gallery: [], status: "error" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
