import { ABOUT, PROFILE } from "../data";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./primitives";
import { FloatingCoffeeBeans } from "./CoffeeVibe";

export function About() {
  return (
    <Section id="about" className="relative z-10">
      {/* Interactive floating barista elements moving around structured boxes */}
      <FloatingCoffeeBeans className="opacity-75" />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-center">
        <div className="relative z-20">
          <div className="absolute -left-12 -top-12 h-72 w-72 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
          <SectionHead eyebrow={ABOUT.eyebrow}>{ABOUT.heading}</SectionHead>
        </div>

        <div className="space-y-8 relative z-20">
          <div className="space-y-6">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p
                  className={cn(
                    "leading-relaxed",
                    i === 0
                      ? "font-display text-xl sm:text-2xl leading-relaxed text-cream font-bold tracking-tight"
                      : "text-base sm:text-lg text-cream-muted leading-relaxed font-medium"
                  )}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 glass-animated p-7 sm:p-9 shadow-2xl flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="absolute -right-4 -bottom-6 font-display text-9xl text-gold/[0.06] pointer-events-none select-none font-black" aria-hidden>
                7
              </div>
              
              <div className="flex items-baseline gap-3 sm:gap-0">
                <span className="font-display text-6xl sm:text-7xl font-extrabold text-gradient">
                  {PROFILE.years}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light sm:hidden">
                  Years Exp
                </span>
              </div>
              
              <div className="h-px w-full sm:h-20 sm:w-[2px] bg-line shrink-0" />
              
              <div className="space-y-1.5">
                <div className="font-display font-extrabold text-xl sm:text-2xl text-cream tracking-tight hidden sm:block">
                  {PROFILE.yearsLabel}
                </div>
                <div className="text-sm sm:text-base font-semibold text-gold-light leading-relaxed">
                  Advanced Espresso Dialing In &amp; Visual Culinary Identity Styling
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
