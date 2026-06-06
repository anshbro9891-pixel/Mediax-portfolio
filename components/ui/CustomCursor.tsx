"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "custom-cursor-dot";
    ring.className = "custom-cursor-ring";
    document.body.append(dot, ring);

    const move = (event: MouseEvent) => {
      dot.style.transform = `translate(${event.clientX - 4}px, ${event.clientY - 4}px)`;
      ring.style.transform = `translate(${event.clientX - 16}px, ${event.clientY - 16}px)`;
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
