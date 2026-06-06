"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import type { Settings } from "@/lib/data";
import { useState } from "react";

export default function SettingsManager({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState("");

  const save = async () => {
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setStatus(response.ok ? "Settings saved." : "Could not save settings.");
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
      {status && <p className="text-sm text-white/75">{status}</p>}
      <input value={settings.agencyName} onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })} placeholder="Agency Name" className="w-full rounded bg-black/40 p-3" />
      <input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} placeholder="Tagline" className="w-full rounded bg-black/40 p-3" />
      <textarea value={settings.about} onChange={(e) => setSettings({ ...settings, about: e.target.value })} placeholder="About" className="h-28 w-full rounded bg-black/40 p-3" />
      <div className="grid gap-3 md:grid-cols-2">
        <input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} placeholder="Email" className="rounded bg-black/40 p-3" />
        <input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} placeholder="Phone" className="rounded bg-black/40 p-3" />
        <input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="WhatsApp" className="rounded bg-black/40 p-3" />
        <input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} placeholder="Address" className="rounded bg-black/40 p-3" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} placeholder="Instagram" className="rounded bg-black/40 p-3" />
        <input value={settings.twitter} onChange={(e) => setSettings({ ...settings, twitter: e.target.value })} placeholder="Twitter" className="rounded bg-black/40 p-3" />
        <input value={settings.linkedin} onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })} placeholder="LinkedIn" className="rounded bg-black/40 p-3" />
        <input value={settings.behance} onChange={(e) => setSettings({ ...settings, behance: e.target.value })} placeholder="Behance" className="rounded bg-black/40 p-3" />
        <input value={settings.dribbble} onChange={(e) => setSettings({ ...settings, dribbble: e.target.value })} placeholder="Dribbble" className="rounded bg-black/40 p-3" />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <input type="number" value={settings.stats.projects} onChange={(e) => setSettings({ ...settings, stats: { ...settings.stats, projects: Number(e.target.value) } })} placeholder="Projects" className="rounded bg-black/40 p-3" />
        <input type="number" value={settings.stats.clients} onChange={(e) => setSettings({ ...settings, stats: { ...settings.stats, clients: Number(e.target.value) } })} placeholder="Clients" className="rounded bg-black/40 p-3" />
        <input type="number" value={settings.stats.years} onChange={(e) => setSettings({ ...settings, stats: { ...settings.stats, years: Number(e.target.value) } })} placeholder="Years" className="rounded bg-black/40 p-3" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-1 text-sm text-white/60">Hero image</p>
          <ImageUpload onUploaded={(path) => setSettings({ ...settings, heroImage: path })} />
          <p className="text-xs text-white/50">{settings.heroImage}</p>
        </div>
        <div>
          <p className="mb-1 text-sm text-white/60">About image</p>
          <ImageUpload onUploaded={(path) => setSettings({ ...settings, aboutImage: path })} />
          <p className="text-xs text-white/50">{settings.aboutImage}</p>
        </div>
      </div>
      <button onClick={save} className="rounded-full bg-[#BEFF00] px-6 py-3 font-semibold text-black">Save Settings</button>
    </div>
  );
}
