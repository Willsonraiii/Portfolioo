import { useEffect, useState } from "react";
import { NAV, PROFILE } from "../data";
import { cn } from "../utils/cn";
import { CupHot, ArrowUpRight, Mail } from "./Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2 sm:py-3" : "py-4 sm:py-5"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex items-center justify-between rounded-3xl border transition-all duration-500 px-4 py-3 sm:px-6 sm:py-3.5",
            scrolled
              ? "glass-premium border-gold/30 shadow-2xl shadow-black/80"
              : "border-gold/15 bg-surface/60 backdrop-blur-md shadow-lg"
          )}
        >
          {/* Accessible Brand identity */}
          <a
            href="#top"
            aria-label="Willson Rai homepage"
            className="group flex items-center gap-3.5 focus-visible:ring-2 focus-visible:ring-gold rounded-2xl p-1"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold via-amber to-espresso font-display text-xl font-black text-espresso shadow-xl shadow-gold/25 transition-transform duration-300 group-hover:scale-105">
              W
            </span>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-cream block leading-tight">
                {PROFILE.brand}
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold/90 block">
                Barista · Visual Craft
              </span>
            </div>
          </a>

          {/* Desktop semantic list */}
          <ul role="menubar" className="hidden items-center gap-1 md:flex bg-base/80 px-2 py-1.5 rounded-2xl border border-line/80 shadow-inner">
            {NAV.map((item) => (
              <li role="none" key={item.id}>
                <a
                  role="menuitem"
                  href={`#${item.id}`}
                  className={cn(
                    "relative rounded-xl px-4 py-2 font-display text-sm font-semibold transition-all duration-300 block focus-visible:ring-2 focus-visible:ring-gold",
                    active === item.id ? "text-gold font-bold bg-surface-2/90 shadow-md" : "text-cream hover:text-gold"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-1 inset-x-4 h-[2px] origin-center bg-gradient-to-r from-gold to-amber transition-transform duration-300",
                      active === item.id ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Action Call & Generous touch target Mobile Button */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Direct commission email"
              className="hidden rounded-2xl border border-gold/40 bg-gradient-to-r from-surface-2 to-surface px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-gold transition-all hover:border-gold hover:text-cream sm:inline-flex items-center gap-2.5 shadow-md focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span>Commissions</span>
              <CupHot className="h-4 w-4" aria-hidden />
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open navigation menu"}
              aria-expanded={open}
              className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-surface text-gold transition-all hover:border-gold hover:bg-surface-2 md:hidden shadow-lg focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative h-4 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-[2.5px] w-5 rounded-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-[2.5px] w-5 rounded-full bg-current transition-all duration-300",
                    open ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[2.5px] w-5 rounded-full bg-current transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Accessible Mobile navigation drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation panel"
        className={cn(
          "mx-4 mt-3 overflow-hidden rounded-3xl border border-gold/30 transition-all duration-500 md:hidden",
          open ? "glass-animated max-h-[34rem] opacity-100 shadow-2xl" : "pointer-events-none max-h-0 border-transparent opacity-0"
        )}
      >
        <ul className="flex flex-col p-5 space-y-2">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-5 py-4 font-display text-lg font-bold transition-all min-h-[44px]",
                  active === item.id
                    ? "bg-gradient-to-r from-espresso to-surface text-gold border border-gold/40 shadow-lg"
                    : "text-cream hover:bg-surface-2/80"
                )}
              >
                <span>{item.label}</span>
                <span className="flex items-center gap-1 text-xs font-sans text-muted font-semibold uppercase tracking-widest" aria-hidden>
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </li>
          ))}
          <li className="pt-4 border-t border-line/80 mt-2">
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-gold via-amber to-gold px-6 py-4 font-display text-base font-extrabold text-[#140e0b] shadow-xl min-h-[44px]"
            >
              <Mail className="h-5 w-5" />
              <span>{PROFILE.email}</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
