import ProjectsManager from "@/components/ui/ProjectsManager";
import AdminShell from "@/components/ui/AdminShell";
import { requireAdminSession } from "@/lib/auth";
import { getProjects } from "@/lib/data";

export default async function AdminProjectsPage() {
  await requireAdminSession();
  const projects = await getProjects();

  return (
    <AdminShell>
      <h1 className="mb-6 font-syne text-4xl font-extrabold">Projects Manager</h1>
      <ProjectsManager initialItems={projects} />
    </AdminShell>
  );
}
