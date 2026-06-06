"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { Settings } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero({ settings }: { settings: Settings }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-10">
      <div className="hero-noise absolute inset-0 opacity-40" />
      <motion.div className="blob blob-a" animate={{ x: [0, 40, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 10 }} />
      <motion.div className="blob blob-b" animate={{ x: [0, -30, 0], y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 12 }} />
      <motion.div style={{ y }} className="relative z-10 mx-auto w-full max-w-[1800px]">
        <h1 className="font-syne text-[clamp(60px,11vw,140px)] font-extrabold leading-[0.94] text-white">
          We Build Digital Experiences That Hit Different
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-white/75">{settings.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#work" className="rounded-full border border-white/50 px-8 py-3">See Our Work</a>
          <a href="#contact" className="rounded-full bg-[#BEFF00] px-8 py-3 font-semibold text-black">Get a Quote</a>
        </div>
        <div className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/20 pt-6 text-lg">
          <div><p className="text-3xl font-bold text-[#BEFF00]"><AnimatedCounter value={settings.stats.projects} /></p><p className="text-white/65">Projects Done</p></div>
          <div><p className="text-3xl font-bold text-[#BEFF00]"><AnimatedCounter value={settings.stats.clients} /></p><p className="text-white/65">Clients</p></div>
          <div><p className="text-3xl font-bold text-[#BEFF00]"><AnimatedCounter value={settings.stats.years} suffix=" yrs" /></p><p className="text-white/65">Years Active</p></div>
        </div>
      </motion.div>
      <ArrowDown className="absolute bottom-8 left-1/2 size-8 -translate-x-1/2 animate-bounce text-white/70" />
    </section>
  );
}
