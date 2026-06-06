"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const text = "BRANDING • WEB DESIGN • MOTION • UI/UX • SOCIAL MEDIA • SEO • VIDEO EDITING •";

  useGSAP(
    () => {
      const tween = gsap.fromTo(
        sectionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          },
        },
      );
      return () => tween.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="-rotate-2 overflow-hidden border-y border-white/20 bg-black py-4">
      <div className="marquee whitespace-nowrap text-xl text-white">
        <span>{text}</span><span>{text}</span>
      </div>
    </section>
  );
}
