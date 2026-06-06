"use client";

import type { Testimonial } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingTween = gsap.fromTo(
        ".testimonials-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".testimonials-heading",
            scrub: true,
            start: "top 92%",
            end: "top 45%",
          },
        },
      );
      return () => headingTween.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section id="testimonials" ref={sectionRef} className="site-container px-6 py-24 md:px-10">
      <h2 className="testimonials-heading font-syne text-5xl font-extrabold text-white">Testimonials</h2>
      <motion.div drag="x" dragConstraints={{ left: -400, right: 0 }} className="mt-10 flex gap-6 overflow-hidden">
        {testimonials.map((item) => (
          <article key={item.id} className="w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex" aria-label={`${item.rating} out of 5 stars`}>
              {Array.from({ length: item.rating }).map((_, i) => <Star key={`${item.id}-${i}`} className="size-4 fill-[#BEFF00] text-[#BEFF00]" />)}
            </div>
            <p className="text-white/80">“{item.quote}”</p>
            <div className="mt-5 flex items-center gap-3">
              <Image src={item.photo} alt={item.name} width={44} height={44} className="rounded-full" />
              <div><p className="font-semibold text-white">{item.name}</p><p className="text-sm text-white/60">{item.company}</p></div>
            </div>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
