import AdminShell from "@/components/ui/AdminShell";
import AdminAsciiLog from "@/components/ui/AdminAsciiLog";
import { requireAdminSession } from "@/lib/auth";
import { getProjects, getServices, getTestimonials } from "@/lib/data";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const [projects, services, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <AdminShell>
      <AdminAsciiLog />
      <h1 className="font-syne text-5xl font-extrabold">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/60">Projects</p><p className="text-3xl font-bold">{projects.length}</p></div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/60">Services</p><p className="text-3xl font-bold">{services.length}</p></div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/60">Testimonials</p><p className="text-3xl font-bold">{testimonials.length}</p></div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/projects" className="rounded bg-white/10 px-4 py-2">Add Project</Link>
        <Link href="/admin/services" className="rounded bg-white/10 px-4 py-2">Add Service</Link>
        <Link href="/admin/testimonials" className="rounded bg-white/10 px-4 py-2">Add Testimonial</Link>
      </div>
      <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-syne text-2xl font-bold">Recent Activity</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-white/75">
          <li>Data-backed CMS connected to JSON files.</li>
          <li>Upload endpoint active for media assets.</li>
          <li>Admin authentication enabled with credentials.</li>
        </ul>
      </div>
    </AdminShell>
  );
}
