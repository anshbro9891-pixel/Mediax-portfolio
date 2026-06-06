import type { Settings } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const values = ["Bold strategy", "Craft precision", "Fast execution", "Transparent collaboration"];

export default function About({ settings }: { settings: Settings }) {
  return (
    <section id="about" className="mx-auto grid max-w-[1800px] gap-8 px-6 py-24 md:grid-cols-2 md:px-10">
      <div>
        <p className="section-number">03</p>
        <h2 className="font-syne text-5xl font-extrabold text-white">About Us</h2>
        <p className="mt-6 text-white/75">{settings.about}</p>
        <ul className="mt-8 space-y-3">
          {values.map((value) => (
            <li key={value} className="flex items-center gap-3 text-white"><CheckCircle2 className="size-5 text-[#BEFF00]" />{value}</li>
          ))}
        </ul>
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10">
        <Image src={settings.aboutImage} alt="About Ultimate Mediax" fill className="object-cover" />
      </div>
    </section>
  );
}
