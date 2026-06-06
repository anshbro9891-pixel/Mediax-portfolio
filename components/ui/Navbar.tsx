"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="#" className="font-syne text-2xl font-bold text-[#BEFF00]">MEDIAX</Link>
        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}><a href={link.href} className="text-white/80 hover:text-white">{link.label}</a></li>
          ))}
        </ul>
        <a href="#contact" className="hidden rounded-full bg-[#BEFF00] px-5 py-2 font-semibold text-black md:inline-block">Start a Project</a>
        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black text-3xl font-syne">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
