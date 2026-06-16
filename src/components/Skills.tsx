import { SKILLS } from "../data";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./primitives";
import { MasteryGraphMeter } from "./CoffeeVibe";
import { CupHot, MilkPitcher, Beaker, Palette, Users, Package } from "./Icons";
import type { ComponentType, SVGProps } from "react";

const SKILL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  cup: CupHot,
  milk: MilkPitcher,
  beaker: Beaker,
  palette: Palette,
  users: Users,
  package: Package,
};

export function Skills() {
  return (
    <Section id="skills" className="relative z-10">
      <SectionHead eyebrow={SKILLS.eyebrow}>{SKILLS.heading}</SectionHead>

      <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.items.map((s, i) => {
          const Icon = SKILL_ICONS[s.icon] ?? CupHot;
          return (
          <Reveal key={s.title} delay={(i % 3) * 90}>
            <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-line glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 shadow-2xl">
              {/* Top light aurora reflection */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-gold/20 to-amber/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-surface to-espresso text-gold shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="font-display font-extrabold text-xs uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-2xl bg-espresso text-gold border border-gold/30 flex items-center gap-2 shadow-inner">
                    <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                    Mastery
                  </span>
                </div>

                <h3 className="mt-7 font-display text-2xl sm:text-3xl font-extrabold text-cream group-hover:text-gold transition-colors tracking-tight">
                  {s.title}
                </h3>

                <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-cream-muted font-medium">
                  {s.desc}
                </p>
              </div>

              {/* Accessible Yield Level Indicator */}
              <div className="mt-10 pt-6 border-t border-line">
                <MasteryGraphMeter
                  label="Extraction Accuracy"
                  percentage={s.level}
                  subtext={s.levelText}
                />
              </div>

              {/* Subtle dynamic shimmer hover sweep */}
              <div className="absolute inset-0 pointer-events-none translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-gold/[0.04] to-transparent transition-transform duration-700" />
            </div>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
