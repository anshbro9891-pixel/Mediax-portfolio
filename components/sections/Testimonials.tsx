"use client";

import type { Testimonial } from "@/lib/data";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="mx-auto max-w-[1800px] px-6 py-24 md:px-10">
      <h2 className="font-syne text-5xl font-extrabold text-white">Testimonials</h2>
      <motion.div drag="x" dragConstraints={{ left: -400, right: 0 }} className="mt-10 flex gap-6 overflow-hidden">
        {testimonials.map((item) => (
          <article key={item.id} className="w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex">
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
