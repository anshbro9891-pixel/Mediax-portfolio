"use client";

import type { Settings } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer({ settings }: { settings: Settings }) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tween = gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          },
        },
      );
      return () => tween.kill();
    },
    { scope: footerRef },
  );

  const socials = [
    ["Instagram", settings.instagram],
    ["Twitter/X", settings.twitter],
    ["LinkedIn", settings.linkedin],
    ["Behance", settings.behance],
    ["Dribbble", settings.dribbble],
  ] as const;

  return (
    <footer ref={footerRef} className="border-t border-white/10 px-6 py-10 md:px-10">
      <div className="site-container flex flex-col justify-between gap-6 md:flex-row">
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
      <p className="site-container mt-8 text-sm text-white/40">© {new Date().getFullYear()} Ultimate Mediax. Built by Ultimate Mediax.</p>
    </footer>
  );
}
