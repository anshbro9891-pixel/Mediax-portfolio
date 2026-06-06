import Link from "next/link";
import { ReactNode } from "react";
import SignOutButton from "./SignOutButton";

const links = [
  ["/admin", "Dashboard"],
  ["/admin/projects", "Projects"],
  ["/admin/services", "Services"],
  ["/admin/testimonials", "Testimonials"],
  ["/admin/settings", "Settings"],
] as const;

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto grid max-w-[1800px] gap-8 p-6 md:grid-cols-[260px_1fr] md:p-10">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-syne text-2xl font-bold text-[#BEFF00]">MEDIAX ADMIN</p>
          <nav className="mt-5 space-y-2">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-white/10">{label}</Link>
            ))}
          </nav>
          <div className="mt-6"><SignOutButton /></div>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
