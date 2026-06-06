import AdminShell from "@/components/ui/AdminShell";
import ServicesManager from "@/components/ui/ServicesManager";
import { requireAdminSession } from "@/lib/auth";
import { getServices } from "@/lib/data";

export default async function AdminServicesPage() {
  await requireAdminSession();
  const services = await getServices();

  return (
    <AdminShell>
      <h1 className="mb-6 font-syne text-4xl font-extrabold">Services Manager</h1>
      <ServicesManager initialItems={services} />
    </AdminShell>
  );
}
