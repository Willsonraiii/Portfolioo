import { Instagram, WhatsApp, GitHubMark } from "./Icons";

const LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/willson_obito/",
    Icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9779765829096",
    Icon: WhatsApp,
  },
  {
    label: "GitHub",
    href: "https://github.com/Willsonraiii",
    Icon: GitHubMark,
  },
];

export function FloatingSocials() {
  return (
    <div
      className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
      aria-label="Social links"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-surface/90 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-md">
        {LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="grid h-11 w-11 place-items-center rounded-full text-cream transition-all hover:bg-gold/15 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
