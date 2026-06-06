import ServiceCard from "@/components/ui/ServiceCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Service } from "@/lib/data";

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="relative mx-auto max-w-[1800px] px-6 py-24 md:px-10">
      <p className="section-number">02</p>
      <h2 className="font-syne text-5xl font-extrabold text-white">Services</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.sort((a, b) => a.order - b.order).map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 0.07}><ServiceCard service={service} /></ScrollReveal>
        ))}
      </div>
    </section>
  );
}
