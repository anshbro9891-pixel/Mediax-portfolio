export default function Marquee() {
  const text = "BRANDING • WEB DESIGN • MOTION • UI/UX • SOCIAL MEDIA • SEO • VIDEO EDITING •";
  return (
    <section className="-rotate-2 overflow-hidden border-y border-white/20 bg-black py-4">
      <div className="marquee whitespace-nowrap text-xl text-white">
        <span>{text}</span><span>{text}</span>
      </div>
    </section>
  );
}
