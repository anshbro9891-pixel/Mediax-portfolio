"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { Settings } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(useGSAP);

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const items = useMemo(
    () => [
      { position: [-2.2, 1.4, -1], color: "#BEFF00", geometry: "torus" as const },
      { position: [2.1, -0.2, -0.6], color: "#00F0FF", geometry: "ico" as const },
      { position: [0, -1.4, -1.1], color: "#FF2D78", geometry: "oct" as const },
    ],
    [],
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += delta * 0.08;
    group.current.position.x = mouse.x * 0.35;
    group.current.position.y = mouse.y * 0.25;
  });

  return (
    <group ref={group}>
      {items.map((item, idx) => (
        <mesh key={idx} position={item.position as [number, number, number]}>
          {item.geometry === "torus" && <torusGeometry args={[0.8, 0.24, 24, 60]} />}
          {item.geometry === "ico" && <icosahedronGeometry args={[0.9, 0]} />}
          {item.geometry === "oct" && <octahedronGeometry args={[0.9, 0]} />}
          <meshStandardMaterial color={item.color} metalness={0.35} roughness={0.3} emissive={item.color} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero({ settings }: { settings: Settings }) {
  const sectionRef = useRef<HTMLElement>(null);

  const headline = "We Build Digital Experiences That Hit Different";

  useGSAP(
    () => {
      const timeline = gsap.timeline();
      timeline.fromTo(
        ".hero-char",
        { yPercent: 130, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.018,
        },
      );
      return () => timeline.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-10">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 3]} intensity={1.2} color="#BEFF00" />
          <pointLight position={[-2, -1, 3]} intensity={0.9} color="#FF2D78" />
          <FloatingShapes />
        </Canvas>
      </div>

      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch" />
        </filter>
      </svg>
      <div className="hero-noise absolute inset-0 opacity-[0.04]" />

      <div className="relative z-10 site-container w-full">
        <h1 className="font-syne text-[clamp(48px,8vw,140px)] font-extrabold leading-[0.94] text-white">
          {headline.split("").map((char, index) => (
            <span key={`${char}-${index}`} className="hero-char inline-block whitespace-pre-wrap">{char}</span>
          ))}
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
      </div>
      <ArrowDown className="absolute bottom-8 left-1/2 z-10 size-8 -translate-x-1/2 animate-bounce text-white/70" />
    </section>
  );
}
