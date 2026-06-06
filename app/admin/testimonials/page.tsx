import AdminShell from "@/components/ui/AdminShell";
import TestimonialsManager from "@/components/ui/TestimonialsManager";
import { requireAdminSession } from "@/lib/auth";
import { getTestimonials } from "@/lib/data";

export default async function AdminTestimonialsPage() {
  await requireAdminSession();
  const testimonials = await getTestimonials();

  return (
    <AdminShell>
      <h1 className="mb-6 font-syne text-4xl font-extrabold">Testimonials Manager</h1>
      <TestimonialsManager initialItems={testimonials} />
    </AdminShell>
  );
}
