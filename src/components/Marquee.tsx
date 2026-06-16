import { Bean } from "./Icons";

export function Marquee() {
  const words = [
    "Espresso Dialing In",
    "Culinary Photography",
    "Latte Microfoam Art",
    "Hospitality Visuals",
    "Manual Pour-Over",
    "Café Menu Layout",
    "Workflow Optimization",
  ];
  const row = [...words, ...words];

  return (
    <div className="relative overflow-hidden border-y-2 border-gold/30 bg-gradient-to-r from-surface-2 via-espresso to-surface-2 py-7 shadow-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-base via-base/90 to-transparent sm:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-base via-base/90 to-transparent sm:w-48" />
      
      <div className="flex w-max animate-marquee items-center gap-12">
        {row.map((w, i) => (
          <div key={i} className="flex items-center gap-12 group">
            <span className="font-display text-2xl font-extrabold text-cream group-hover:text-gold transition-colors sm:text-4xl tracking-tight drop-shadow-md">
              {w}
            </span>
            <span className="glass-animated grid h-11 w-11 place-items-center rounded-2xl border border-gold/40 text-gold shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
              <Bean className="h-5 w-5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
