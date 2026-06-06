"use client";

import type { Settings } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact({ settings }: { settings: Settings }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingTween = gsap.fromTo(
        ".contact-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".contact-heading",
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
    <section id="contact" ref={sectionRef} className="site-container relative grid gap-10 px-6 py-24 md:grid-cols-2 md:px-10">
      <p className="pointer-events-none absolute right-6 top-0 text-6xl font-extrabold text-white/5 md:text-8xl">LET&apos;S WORK</p>
      <div>
        <h2 className="contact-heading font-syne text-5xl font-extrabold text-white">Contact</h2>
        <div className="mt-6 space-y-2 text-white/75">
          <p>{settings.email}</p>
          <p>{settings.phone}</p>
          <p>{settings.address}</p>
        </div>
      </div>
      <form
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          // Placeholder behaviour per spec: no external API required.
          // eslint-disable-next-line no-console
          console.log("Contact form submission", data);
          form.reset();
        }}
      >
        <input required name="name" placeholder="Name" className="w-full rounded bg-black/40 p-3" />
        <input required name="email" type="email" placeholder="Email" className="w-full rounded bg-black/40 p-3" />
        <select required name="projectType" className="w-full rounded bg-black/40 p-3">
          <option value="">Project Type</option><option>Web</option><option>Branding</option><option>Social</option><option>Video</option>
        </select>
        <textarea required name="message" placeholder="Tell us about your project" className="h-32 w-full rounded bg-black/40 p-3" />
        <button className="rounded-full bg-[#BEFF00] px-6 py-3 font-semibold text-black">Send Message</button>
      </form>
    </section>
  );
}
