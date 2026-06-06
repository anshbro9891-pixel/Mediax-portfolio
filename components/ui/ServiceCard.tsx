import { Clapperboard, Megaphone, Monitor, Palette, Search, Sparkles } from "lucide-react";
import type { Service } from "@/lib/data";

type IconType = typeof Monitor;

const iconMap: Record<string, IconType> = {
  Monitor,
  Palette,
  Megaphone,
  Clapperboard,
  Search,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? Sparkles;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#BEFF00]">
      <Icon className="mb-4 size-8 text-[#BEFF00]" />
      <h3 className="font-syne text-2xl font-extrabold text-white">{service.title}</h3>
      <p className="mt-3 text-white/70">{service.description}</p>
    </article>
  );
}
