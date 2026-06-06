import AdminShell from "@/components/ui/AdminShell";
import SettingsManager from "@/components/ui/SettingsManager";
import { requireAdminSession } from "@/lib/auth";
import { getSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const settings = await getSettings();

  return (
    <AdminShell>
      <h1 className="mb-6 font-syne text-4xl font-extrabold">Site Settings</h1>
      <SettingsManager initialSettings={settings} />
    </AdminShell>
  );
}
