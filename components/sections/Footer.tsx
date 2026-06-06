import type { Settings } from "@/lib/data";

export default function Footer({ settings }: { settings: Settings }) {
  const socials = [
    ["Instagram", settings.instagram],
    ["Twitter/X", settings.twitter],
    ["LinkedIn", settings.linkedin],
    ["Behance", settings.behance],
    ["Dribbble", settings.dribbble],
  ] as const;

  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-6 md:flex-row">
        <div>
          <p className="font-syne text-2xl font-bold text-[#BEFF00]">MEDIAX</p>
          <p className="mt-2 text-white/65">{settings.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {socials.map(([label, href]) => (
            <a key={label} href={href} className="text-white/70 hover:text-white" target="_blank">{label}</a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1800px] text-sm text-white/40">© {new Date().getFullYear()} Ultimate Mediax. Built by Ultimate Mediax.</p>
    </footer>
  );
}
