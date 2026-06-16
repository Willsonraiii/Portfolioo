import { CREDS } from "../data";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./primitives";
import { GradCap, Award } from "./Icons";

const GROUP_ICONS = [GradCap, Award];
const GROUP_LABELS = ["Premium Academy Training", "Certified Credentials"];

export function Credentials() {
  return (
    <Section id="creds" className="relative z-10">
      <SectionHead eyebrow={CREDS.eyebrow}>
        {CREDS.headingPre}{" "}
        <em className="not-italic text-gradient">{CREDS.headingEm}</em>
      </SectionHead>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {CREDS.groups.map((g, gi) => {
          const GroupIcon = GROUP_ICONS[gi] ?? GradCap;
          return (
          <Reveal key={g.title} delay={gi * 100}>
            <div className="h-full rounded-3xl border border-line glass-card p-8 sm:p-11 shadow-2xl">
              <div className="flex items-center gap-3 border-b-2 border-line pb-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-espresso text-gold shadow-inner">
                  <GroupIcon className="h-6 w-6" />
                </span>
                <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-gold">
                  {GROUP_LABELS[gi]}
                </span>
              </div>

              <div className="mt-9 space-y-9">
                {g.items.map((it, i) => (
                  <div key={i} className="group relative border-l-3 border-line hover:border-gold pl-7 transition-colors duration-300">
                    <span className="absolute -left-[8px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-espresso bg-gold group-hover:scale-125 transition-transform" />
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-cream group-hover:text-gold transition-colors">
                      {it.t}
                    </h4>
                    <p className="mt-2.5 text-base sm:text-lg leading-relaxed text-cream-muted font-medium">
                      {it.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
