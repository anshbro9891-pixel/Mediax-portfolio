import type { Project } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 transition group-hover:opacity-100" />
      <div className="absolute bottom-0 z-10 w-full p-6">
        <p className="text-sm text-[#BEFF00]">{project.category}</p>
        <h3 className="font-syne text-2xl font-extrabold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-white/70">{project.tags.join(" • ")}</p>
        <Link className="mt-3 inline-block text-[#00F0FF]" href={project.link} target="_blank">
          View →
        </Link>
      </div>
    </article>
  );
}
