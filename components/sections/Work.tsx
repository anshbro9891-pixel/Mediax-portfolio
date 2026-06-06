"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/data";
import { useMemo, useState } from "react";

const tabs = ["All", "Web", "Branding", "Social", "Video"] as const;

export default function Work({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");

  const filtered = useMemo(
    () => projects.filter((item) => active === "All" || item.category === active),
    [active, projects],
  );

  return (
    <section id="work" className="mx-auto max-w-[1800px] px-6 py-24 md:px-10">
      <h2 className="font-syne text-5xl font-extrabold text-white">Selected Work</h2>
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
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
