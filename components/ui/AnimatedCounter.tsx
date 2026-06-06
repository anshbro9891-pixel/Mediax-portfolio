"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
};

export default function AnimatedCounter({ value, suffix = "+" }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <motion.span>{current}{suffix}</motion.span>;
}
