import { EXPERIENCE } from "../data";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./primitives";
import { MasteryGraphMeter } from "./CoffeeVibe";
import { Sparkle, CupHot } from "./Icons";

export function Experience() {
  return (
    <Section id="experience" className="relative z-10">
      <SectionHead eyebrow={EXPERIENCE.eyebrow}>{EXPERIENCE.heading}</SectionHead>

      <div className="mt-16 relative">
        {/* Lighter elegant barista extraction timeline line */}
        <div className="absolute left-6 md:left-[15rem] top-0 bottom-0 w-[3px] bg-gradient-to-b from-gold via-amber to-line shadow-xl shadow-gold/40 hidden md:block rounded-full" />

        <div className="space-y-8 sm:space-y-14">
          {EXPERIENCE.items.map((job, i) => (
            <Reveal key={job.title + i} delay={i * 90}>
              <article
                className={cn(
                  "group relative overflow-hidden rounded-3xl border glass-card p-7 md:p-10 transition-all duration-500 shadow-xl",
                  job.current ? "border-gold/60 shadow-2xl shadow-gold/15 bg-gradient-to-br from-surface-2/90 to-surface/90" : "border-line hover:border-gold/40"
                )}
              >
                {/* Timeline interactive marker bead */}
                <div
                  aria-hidden
                  className="absolute left md:-left-[1.35rem] top-12 h-5 w-5 rounded-full bg-gradient-to-br from-gold to-amber border-4 border-base shadow-2xl shadow-gold/80 hidden md:block z-20 group-hover:scale-125 transition-transform duration-300"
                />

                {/* Corner light reflection */}
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                <div className="relative grid gap-8 md:grid-cols-[17rem_1fr] md:gap-12 items-start">
                  {/* Left Role Metadata & Accessible Meters */}
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-2 rounded-2xl border border-gold/40 bg-espresso px-4 py-1.5 text-xs font-bold text-gold shadow-md">
                        <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                        {job.period}
                      </span>
                      {job.current && (
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-extrabold text-emerald-300 shadow-lg">
                          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
                          Current Role
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-cream tracking-tight group-hover:text-gold transition-colors">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base font-bold text-gold-light flex items-center gap-2">
                        <Sparkle className="h-3.5 w-3.5 shrink-0" />
                        <span>{job.org}</span>
                      </p>
                    </div>

                    {/* Highly Accessible Level Meters */}
                    <div className="pt-5 border-t border-line space-y-4">
                      <MasteryGraphMeter
                        label={job.stats.efficiencyLabel}
                        percentage={job.stats.efficiency}
                      />
                      <MasteryGraphMeter
                        label={job.stats.teamLabel}
                        percentage={job.stats.teamRating}
                      />
                    </div>
                  </div>

                  {/* Right Impact Bullets */}
                  <div className="space-y-5 md:pl-8 md:border-l-2 border-line/80">
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-light flex items-center gap-2.5">
                      <CupHot className="h-5 w-5 text-gold" />
                      <span>Key Responsibilities &amp; Impact</span>
                    </h4>
                    <ul className="space-y-3.5">
                      {job.points.map((pt, j) => (
                        <li
                          key={j}
                          className="flex gap-4 text-sm sm:text-base leading-relaxed text-cream-muted font-medium hover:text-cream transition-colors"
                        >
                          <span className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-gold to-amber shadow-sm" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Exquisite faint watermark index */}
                <span className="pointer-events-none absolute right-6 bottom-4 font-display text-8xl font-black text-white/[0.03] select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
