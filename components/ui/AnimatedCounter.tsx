"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  value: number;
  suffix?: string;
};

export default function AnimatedCounter({ value, suffix = "+" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const state = { val: 0 };
      const tween = gsap.to(state, {
        val: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          if (!ref.current) return;
          ref.current.textContent = `${Math.round(state.val)}${suffix}`;
        },
      });
      return () => tween.kill();
    },
    { scope: ref },
  );

  return <span ref={ref}>0{suffix}</span>;
}
