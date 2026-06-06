"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tabs = ["All", "Web", "Branding", "Social", "Video"] as const;

export default function Work({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = useMemo(
    () => projects.filter((item) => active === "All" || item.category === active),
    [active, projects],
  );

  useGSAP(
    () => {
      const headingTween = gsap.fromTo(
        ".work-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".work-heading",
            scrub: true,
            start: "top 92%",
            end: "top 45%",
          },
        },
      );

      const cardsTween = gsap.fromTo(
        ".project-card",
        { opacity: 0, scale: 0.85, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-grid",
            start: "top 85%",
          },
        },
      );

      return () => {
        headingTween.kill();
        cardsTween.kill();
      };
    },
    { dependencies: [filtered], scope: sectionRef, revertOnUpdate: true },
  );

  return (
    <section id="work" ref={sectionRef} className="site-container px-6 py-24 md:px-10">
      <h2 className="work-heading font-syne text-5xl font-extrabold text-white">Selected Work</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-full border px-5 py-2 ${active === tab ? "border-[#BEFF00] bg-[#BEFF00] text-black" : "border-white/30 text-white"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="work-grid mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
