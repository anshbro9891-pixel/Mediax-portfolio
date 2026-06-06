"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import type { Service } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Services({ services }: { services: Service[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingTween = gsap.fromTo(
        ".services-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".services-heading",
            scrub: true,
            start: "top 90%",
            end: "top 45%",
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      const cardTweens = cards.map((card, index) =>
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              scrub: 1,
            },
          },
        ),
      );

      return () => {
        headingTween.kill();
        cardTweens.forEach((tween) => tween.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="services" ref={sectionRef} className="site-container relative px-6 py-24 md:px-10">
      <p className="section-number">02</p>
      <h2 className="services-heading font-syne text-5xl font-extrabold text-white">Services</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services
          .sort((a, b) => a.order - b.order)
          .map((service) => (
            <div key={service.id} className="service-card">
              <ServiceCard service={service} />
            </div>
          ))}
      </div>
    </section>
  );
}
