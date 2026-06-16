import { cn } from "../utils/cn";

export function AmbientCoffeeRings() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dynamic accessible extraction rings */}
      <div className="absolute -left-36 top-1/4 h-[44rem] w-[44rem] animate-coffee-ring rounded-full border border-gold/15 bg-gradient-to-tr from-gold/[0.03] to-transparent blur-2xl" />
      <div className="absolute -right-20 bottom-10 h-[34rem] w-[34rem] animate-coffee-ring rounded-full border border-dashed border-amber/20 bg-gradient-to-bl from-amber/[0.04] to-transparent blur-xl" />
      {/* Extraction droplet motif */}
      <div className="absolute left-2/3 top-16 flex flex-col items-center gap-6 opacity-40">
        <span className="h-3.5 w-3.5 animate-extraction rounded-full bg-gradient-to-b from-gold via-gold-light to-amber shadow-xl shadow-gold/60" />
      </div>
    </div>
  );
}

export function FloatingCoffeeBeans({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden z-10 select-none", className)}>
      {/* Bean 1 - top right */}
      <div className="absolute right-[10%] top-[15%] animate-float-bean-1 opacity-60">
        <div className="relative flex h-11 w-8 items-center justify-center rounded-[48%/70%] bg-gradient-to-br from-[#5a402e] via-[#38261b] to-[#1a110b] shadow-2xl border border-gold/20">
          <div className="h-[80%] w-[3px] rounded-full bg-[#100b08] shadow-inner" />
        </div>
      </div>

      {/* Bean 2 - mid left */}
      <div className="absolute left-[6%] top-[52%] animate-float-bean-2 opacity-50">
        <div className="relative flex h-9 w-6 rotate-45 items-center justify-center rounded-[48%/70%] bg-gradient-to-br from-[#6b4a35] via-[#422c1f] to-[#20150e] shadow-2xl border border-gold/25">
          <div className="h-[75%] w-[2.5px] rounded-full bg-[#100a07] shadow-inner" />
        </div>
      </div>

      {/* Bean 3 - bottom right */}
      <div className="absolute bottom-[12%] right-[18%] animate-float-bean-3 opacity-45">
        <div className="relative flex h-10 w-7 -rotate-12 items-center justify-center rounded-[48%/70%] bg-gradient-to-br from-[#503726] via-[#302117] to-[#18100b] shadow-2xl border border-gold/20">
          <div className="h-[82%] w-[2.5px] rounded-full bg-[#0d0906] shadow-inner" />
        </div>
      </div>
    </div>
  );
}

export function SteamWisps({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute -top-10 inset-x-0 flex justify-center gap-5 z-20", className)}>
      <span className="h-12 w-2.5 animate-steam-1 rounded-full bg-gradient-to-t from-cream/50 to-transparent blur-[4px]" />
      <span className="h-16 w-3.5 animate-steam-2 rounded-full bg-gradient-to-t from-gold/45 to-transparent blur-[5px]" />
      <span className="h-14 w-3 animate-steam-3 rounded-full bg-gradient-to-t from-cream/45 to-transparent blur-[4px]" />
    </div>
  );
}

export function MasteryGraphMeter({
  label,
  percentage,
  subtext,
  className,
}: {
  label: string;
  percentage: number;
  subtext?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
        <span className="text-cream font-display tracking-tight font-bold">{label}</span>
        <div className="flex items-center gap-2">
          {subtext && <span className="text-gold-light/90 font-medium text-xs hidden sm:inline-block">{subtext}</span>}
          <span className="font-display font-extrabold text-gold bg-espresso px-2.5 py-1 rounded-lg border border-line shadow-sm">
            {percentage}%
          </span>
        </div>
      </div>
      {/* High contrast visual graph meter bar */}
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} execution accuracy`}
        className="level-bar h-4 w-full p-[2px] border border-line/80 rounded-full"
      >
        <div
          className="level-fill flex items-center justify-end pr-2 text-[0.65rem] font-black text-[#140e0b]"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-2 w-2 rounded-full bg-[#140e0b]/75 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  );
}
