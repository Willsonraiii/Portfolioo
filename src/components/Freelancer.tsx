import { FREELANCER, PROFILE } from "../data";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./primitives";
import { AmbientCoffeeRings } from "./CoffeeVibe";
import { ArrowRight } from "./Icons";

export function Freelancer() {
  return (
    <Section id="freelancer" className="relative z-10">
      <AmbientCoffeeRings />

      <SectionHead eyebrow={FREELANCER.eyebrow}>
        {FREELANCER.headingPre}{" "}
        <em className="not-italic text-gradient">{FREELANCER.headingEm}</em>
      </SectionHead>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16 items-start">
        {/* Left Interactive Services List */}
        <ul className="space-y-5">
          {FREELANCER.items.map((s, i) => (
            <li key={s.num}>
              <Reveal delay={i * 80}>
                <div className="group flex gap-7 rounded-3xl border border-line glass-card p-7 sm:p-9 transition-all duration-500 hover:border-gold/60 hover:-translate-y-1 shadow-2xl">
                  <span className="font-display text-4xl sm:text-5xl font-black text-gradient opacity-90 group-hover:opacity-100 transition-opacity">
                    {s.num}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream group-hover:text-gold transition-colors tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-cream-muted font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Right Ultra-Premium Lighter Glass Commission CTA */}
        <Reveal delay={120} className="sticky top-32">
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 glass-premium p-8 sm:p-12 shadow-2xl">
            {/* Luminous background highlights */}
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl animate-pulse-gold" />

            {/* Top commissioning flag */}
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 shadow-lg">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              <span>Available for Commissions</span>
            </div>

            <h3 className="mt-8 font-display text-4xl sm:text-5xl font-extrabold text-cream tracking-tight leading-tight">
              {FREELANCER.cta.heading}
            </h3>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-cream-muted font-medium">
              {FREELANCER.cta.body}
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Send direct message to Willson Rai"
                className="group relative overflow-hidden flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gold via-amber to-gold bg-[length:200%_auto] p-5 text-base sm:text-lg font-extrabold text-[#140e0b] transition-all duration-500 hover:bg-[position:100%_0] hover:shadow-2xl hover:shadow-amber/50 hover:scale-[1.02] active:scale-[0.98] shadow-xl min-h-[54px]"
              >
                <span>{FREELANCER.cta.button}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>

              <div className="rounded-2xl border border-line bg-espresso/90 p-4.5 text-center shadow-inner">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-faint block mb-1">
                  Direct Email Channel
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-display text-base font-bold text-gold transition-colors hover:text-cream select-all inline-block"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
