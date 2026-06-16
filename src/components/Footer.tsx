import { NAV, PROFILE } from "../data";
import { Reveal } from "./Reveal";
import { Mail, Sparkle, ArrowUp, MapPin } from "./Icons";

export function Footer() {
  return (
    <footer role="contentinfo" className="relative border-t-2 border-line bg-surface/40 pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Column 1: Identity & Direct Connect */}
            <div className="space-y-4">
              <a href="#top" aria-label="Back to homepage" className="flex items-center gap-3 inline-block">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold via-amber to-espresso font-display text-xl font-black text-espresso shadow-lg">
                  W
                </span>
                <span className="font-display text-2xl font-bold text-cream tracking-tight">
                  {PROFILE.brand}
                </span>
              </a>
              <p className="max-w-xs text-base leading-relaxed text-cream-muted font-medium">
                {PROFILE.role}. {PROFILE.tagline}
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Send email directly"
                  className="inline-flex items-center gap-3 rounded-2xl border border-gold/40 bg-espresso px-5 py-3 text-sm font-bold text-cream transition-all hover:border-gold hover:text-gold shadow-md min-h-[44px]"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>{PROFILE.email}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Shortcuts */}
            <div>
              <h4 className="flex items-center gap-2 font-display text-xs font-black uppercase tracking-[0.25em] text-gold">
                <Sparkle className="h-3.5 w-3.5" /> Navigation Explore
              </h4>
              <ul className="mt-5 space-y-3">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      className="text-base font-semibold text-cream hover:text-gold transition-colors block py-1"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Location & Top Jump */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-display text-xs font-black uppercase tracking-[0.25em] text-gold">
                <Sparkle className="h-3.5 w-3.5" /> Studio Base
              </h4>
              <p className="flex items-center gap-2 text-base font-semibold text-cream">
                <MapPin className="h-4 w-4 text-gold" /> Lalitpur, Nepal
              </p>
              <div className="pt-4">
                <a
                  href="#top"
                  aria-label="Back to top of page"
                  className="inline-flex items-center gap-2 font-display text-sm font-black uppercase tracking-[0.15em] text-gold transition-all hover:translate-y-[-2px] py-2"
                >
                  <span>Back to top</span>
                  <ArrowUp className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Faint copyright bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line/80 pt-8 text-xs font-semibold text-faint">
          <p>© {new Date().getFullYear()} Willson Rai. All rights reserved.</p>
          <p>Accessible visual craft &amp; barista design.</p>
        </div>
      </div>
    </footer>
  );
}
