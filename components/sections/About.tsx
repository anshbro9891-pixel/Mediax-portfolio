"use client";

import type { Settings } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const values = ["Bold strategy", "Craft precision", "Fast execution", "Transparent collaboration"];

export default function About({ settings }: { settings: Settings }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingTween = gsap.fromTo(
        ".about-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".about-heading",
            scrub: true,
            start: "top 92%",
            end: "top 45%",
          },
        },
      );

      const trackTween = gsap.to(".about-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-pin",
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });

      return () => {
        headingTween.kill();
        trackTween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="about" ref={sectionRef} className="site-container px-6 py-24 md:px-10">
      <p className="section-number">03</p>
      <h2 className="about-heading font-syne text-5xl font-extrabold text-white">About Us</h2>
      <div className="about-pin mt-8 overflow-hidden rounded-3xl border border-white/10">
        <div className="about-track flex w-[200%]">
          <div className="grid w-1/2 gap-8 bg-white/5 p-8 md:grid-cols-2">
            <div>
              <p className="text-white/75">{settings.about}</p>
              <ul className="mt-8 space-y-3">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-3 text-white"><CheckCircle2 className="size-5 text-[#BEFF00]" />{value}</li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10">
              <Image src={settings.aboutImage} alt="About Ultimate Mediax" fill className="object-cover" />
            </div>
          </div>
          <div className="grid w-1/2 place-items-center bg-gradient-to-r from-[#111] to-[#191919] p-8">
            <p className="max-w-xl text-center text-3xl font-bold text-white/85">From concept to campaign, we design with impact and execute with speed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
