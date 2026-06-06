"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 16;
      const rotateX = -((y / rect.height) - 0.5) * 16;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.26), transparent 42%)`;
    };

    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      glare.style.opacity = "0";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`relative transform-gpu transition-all duration-300 hover:shadow-2xl ${className}`}>
      <div ref={glareRef} className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity" />
      {children}
    </div>
  );
}
