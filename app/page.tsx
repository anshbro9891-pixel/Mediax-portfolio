import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import { getProjects, getServices, getSettings, getTestimonials } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default async function Home() {
  const [projects, services, settings, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getSettings(),
    getTestimonials(),
  ]);

  return (
    <main>
      <CustomCursor />
      <Navbar />
      <Hero settings={settings} />
      <Marquee />
      <Services services={services} />
      <Work projects={projects} />
      <About settings={settings} />
      <Testimonials testimonials={testimonials} />
      <Contact settings={settings} />
      <Footer settings={settings} />
      <a
        href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
        className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle />
      </a>
    </main>
  );
}
