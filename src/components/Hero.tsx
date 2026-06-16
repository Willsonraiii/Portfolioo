import { PROFILE } from "../data";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";
import { FloatingCoffeeBeans, SteamWisps } from "./CoffeeVibe";
import { Sparkle, CupHot, MilkPitcher, ArrowUpRight } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-36 sm:pb-36 sm:pt-48">
      {/* Interactive floating coffee vibe beans moving across animated layers */}
      <FloatingCoffeeBeans className="opacity-70 z-20" />

      {/* Lighter accessible ambient decorative rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-12 h-[42rem] w-[42rem] rounded-full border border-gold/25 bg-gradient-to-tr from-gold/[0.04] via-amber/[0.02] to-transparent blur-3xl animate-pulse-gold"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-44 h-[28rem] w-[28rem] animate-spin-slow rounded-full border-2 border-dashed border-amber/30 opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[2.5px] w-5/6 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 via-amber/40 to-transparent shadow-xl shadow-gold/40"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.18fr_0.82fr]">
        {/* Left column */}
        <div className="relative z-30">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gradient-to-r from-surface-2 via-surface to-espresso px-5 py-2.5 shadow-xl">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
              <Sparkle className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.26em] text-gold sm:text-xs">
                Barista · Freelancer · Craftsman
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.93] tracking-tight text-cream sm:text-7xl lg:text-[6rem]">
              {PROFILE.nameFirst}
              <br />
              <span className="text-gradient drop-shadow-lg">{PROFILE.nameLast}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <span className="font-display text-2xl font-bold text-gold-light sm:text-3xl">
                {PROFILE.role}
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-amber hidden sm:inline-block" aria-hidden />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed font-medium">
              {PROFILE.tagline}
            </p>
          </Reveal>

          {/* Fully accessible interactive CTA block */}
          <Reveal delay={300}>
            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#gallery"
                aria-label="View freelance visual portfolio gallery"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3.5 rounded-2xl bg-gradient-to-r from-gold via-amber to-gold bg-[length:200%_auto] px-8 py-4.5 text-base font-extrabold text-[#140e0b] transition-all duration-500 hover:bg-[position:100%_0] hover:shadow-2xl hover:shadow-amber/50 hover:scale-[1.02] active:scale-[0.98] min-h-[50px] shadow-lg"
              >
                <span>Explore Visual Portfolio</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#140e0b]/20 transition-transform group-hover:translate-x-1" aria-hidden>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Direct hire and barista consulting email"
                className="inline-flex items-center justify-center gap-3.5 rounded-2xl border-2 border-line bg-surface/90 px-8 py-4.5 text-base font-bold text-cream transition-all duration-300 hover:border-gold hover:bg-surface-2 hover:text-gold hover:shadow-xl active:scale-[0.98] min-h-[50px]"
              >
                <span>Consulting &amp; Hire</span>
                <CupHot className="h-5 w-5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border border-gold/30 glass-animated p-6 sm:p-7 shadow-2xl">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl sm:text-6xl font-black text-gradient">
                  {PROFILE.years}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold-light">
                  {PROFILE.yearsLabel}
                </span>
              </div>
              <div className="h-px w-full sm:h-14 sm:w-[2px] bg-line/80 shrink-0" />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-cream">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Available for Commissions</span>
                </div>
                <div className="text-xs text-gold-light font-medium">
                  Based in Lalitpur &amp; Kathmandu Valley
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right image framing with premium lighter glass container */}
        <Reveal delay={200} blur className="relative z-20">
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            {/* Ambient golden halo */}
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[3rem] bg-gradient-to-tr from-amber/35 via-gold/25 to-transparent blur-3xl animate-pulse-gold"
            />

            {/* Main rosetta latte art card — Crafted by Love */}
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-gold/30 glass-premium p-3 shadow-2xl shadow-black/90">
              <div className="relative overflow-hidden rounded-[2rem]">
                <SteamWisps className="top-4" />
                <SmartImage
                  src={PROFILE.heroImage}
                  alt="Rosetta latte art — crafted by love"
                  eager
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent opacity-85" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">
                        <Sparkle className="h-3 w-3" />
                        Signature Rosetta
                      </span>
                      <h3 className="font-display text-2xl font-bold text-cream mt-1 drop-shadow-md italic">
                        {PROFILE.heroCaption}
                      </h3>
                    </div>
                    <div className="glass-animated grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-gold shadow-2xl border border-gold/40">
                      <CupHot className="h-7 w-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating animated metadata badge (Free-pour) */}
            <div className="absolute -left-5 sm:-left-8 top-16 hidden animate-float-bean-1 rounded-3xl glass-animated p-4 shadow-2xl sm:flex items-center gap-3.5 border border-gold/40 z-30">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold to-amber text-espresso shadow-lg">
                <MilkPitcher className="h-6 w-6" />
              </div>
              <div>
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">
                  Free-Pour Art
                </div>
                <div className="font-display font-bold text-sm text-cream mt-0.5 tracking-tight">
                  Microfoam Silking
                </div>
              </div>
            </div>

            {/* Floating accessible extraction yield badge */}
            <div className="absolute -right-5 sm:-right-8 bottom-20 hidden animate-float-bean-2 rounded-3xl glass-premium p-4 shadow-2xl sm:flex items-center gap-3.5 border border-gold/30 z-30">
              <div className="font-display text-3xl font-extrabold text-gold px-1">
                1:2
              </div>
              <div className="border-l-2 border-line pl-3">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold-light">
                  Brew Ratio
                </div>
                <div className="text-xs font-bold text-cream mt-0.5">
                  Perfect Yield
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Elegant mobile-accessible scroll indicator */}
      <div className="mt-20 flex justify-center relative z-30">
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="group flex flex-col items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-muted transition-colors hover:text-gold p-2"
        >
          <span>Discover Visual Craft</span>
          <span className="flex h-11 w-5 justify-center rounded-full border-2 border-line group-hover:border-gold/60 p-1 transition-colors shadow-inner bg-surface/50">
            <span className="h-2.5 w-1.5 animate-floaty rounded-full bg-gradient-to-b from-gold to-amber" />
          </span>
        </a>
      </div>
    </section>
  );
}
