import { useEffect, useState } from "react";
import { GALLERY } from "../data";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";
import { Section, SectionHead } from "./primitives";
import { Camera, Expand, Close, ChevronLeft, ChevronRight, Sparkle, CupHot } from "./Icons";

// Dynamic architectural masonry spans
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
];

export function Gallery({ gallery }: { gallery: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const count = GALLERY.captions.length;
  const items = GALLERY.captions.map((cap, i) => ({
    cap,
    cat: GALLERY.categories[i],
    src: gallery[i] ?? null,
  }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % count));
      if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : (a + count - 1) % count));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, count]);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const move = (dir: number) =>
    setActive((a) => (a === null ? a : (a + dir + count) % count));

  return (
    <Section id="gallery" className="relative z-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-end justify-between border-b border-line pb-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-espresso px-3.5 py-1 text-xs font-semibold text-gold mb-3">
            <Camera className="h-3.5 w-3.5" />
            <span>Professional Visuals &amp; Styling</span>
          </span>
          <SectionHead eyebrow={GALLERY.eyebrow}>{GALLERY.heading}</SectionHead>
        </div>

        <Reveal delay={120} className="space-y-4">
          <p className="text-sm leading-relaxed text-muted sm:text-base font-medium">
            {GALLERY.desc}
          </p>
          {/* Metadata camera spec tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="glass font-display text-xs px-3 py-1.5 rounded-xl border border-line text-gold flex items-center gap-1.5">
              <Sparkle className="h-3 w-3" />
              <span>Gear:</span>
              <span className="text-cream">{GALLERY.metadata.gear}</span>
            </span>
            <span className="glass font-display text-xs px-3 py-1.5 rounded-xl border border-line text-muted">
              {GALLERY.metadata.spec}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Main interactive masonry gallery */}
      <div className="mt-12 grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % 4) * 80} className={cn(SPANS[i], "h-full")}>
            <button
              onClick={() => setActive(i)}
              className="group relative block h-full w-full overflow-hidden rounded-3xl border border-line/90 bg-surface shadow-2xl transition-all duration-500 hover:border-gold/60 hover:shadow-gold/10"
            >
              <SmartImage
                src={it.src}
                alt={it.cap}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Premium dark vignette and gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-left">
                {/* Top styling category tag */}
                <div className="flex justify-between items-center">
                  <span className="glass font-display text-xs font-semibold px-3 py-1 rounded-full border border-line/80 text-gold shadow-md backdrop-blur-md">
                    {it.cat}
                  </span>
                  <span className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line/80 text-gold opacity-0 scale-75 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 shadow-xl">
                    <Expand className="h-5 w-5" />
                  </span>
                </div>

                {/* Bottom Title */}
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold/80 block mb-1">
                    Project 0{i + 1}
                  </span>
                  <span className="font-display text-lg font-bold text-cream sm:text-2xl tracking-tight drop-shadow-md">
                    {it.cap}
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Premium Coffee Lightbox modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-base/95 p-4 backdrop-blur-xl animate-fade-in"
          onClick={() => setActive(null)}
        >
          {/* Modal header & controls */}
          <div className="absolute top-6 inset-x-6 flex justify-between items-center pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-espresso border border-gold/30 font-display text-gold font-bold">
                W
              </span>
              <div>
                <div className="font-display font-semibold text-cream text-base">
                  {items[active].cap}
                </div>
                <div className="text-xs text-muted">
                  Professional Culinary &amp; Beverage Photography
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
              <span className="font-display font-semibold text-sm text-gold bg-surface-2 px-3 py-1.5 rounded-full border border-line">
                {active + 1} / {count}
              </span>
              <button
                onClick={() => setActive(null)}
                aria-label="Close modal"
                className="grid h-11 w-11 place-items-center rounded-full border border-line glass-premium text-cream transition-colors hover:text-gold hover:border-gold"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation ← */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-gold/20 glass-premium text-cream transition-all hover:text-gold hover:border-gold hover:scale-110 shadow-2xl"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main Photo Display */}
          <figure
            className="relative max-h-[82vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-3xl border-2 border-gold/20 glass-card p-2 sm:p-4 shadow-2xl shadow-black">
              {items[active].src ? (
                <img
                  src={items[active].src}
                  alt={items[active].cap}
                  className="mx-auto max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-inner"
                />
              ) : (
                <div className="mx-auto grid h-[50vh] w-full max-w-xl place-items-center bg-gradient-to-br from-surface-2 to-surface opacity-30 animate-pulse">
                  <CupHot className="h-16 w-16 text-gold" />
                </div>
              )}
            </div>

            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4 glass-card px-6 py-4 rounded-2xl border border-line mx-auto max-w-2xl">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold block">
                  {items[active].cat}
                </span>
                <span className="font-display text-xl font-bold text-cream mt-0.5 block">
                  {items[active].cap}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-muted bg-espresso px-3 py-1.5 rounded-xl border border-line">
                  {GALLERY.metadata.gear}
                </span>
              </div>
            </figcaption>
          </figure>

          {/* Navigation → */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-gold/20 glass-premium text-cream transition-all hover:text-gold hover:border-gold hover:scale-110 shadow-2xl"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </Section>
  );
}
