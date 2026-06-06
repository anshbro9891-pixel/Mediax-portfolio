"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import type { Project, ProjectCategory } from "@/lib/data";
import { useState } from "react";

const empty: Omit<Project, "id"> = {
  title: "",
  description: "",
  category: "Web",
  tags: [],
  image: "/uploads/project-1.svg",
  link: "",
  featured: false,
};

export default function ProjectsManager({ initialItems }: { initialItems: Project[] }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const save = async () => {
    const method = editing ? "PUT" : "POST";
    const payload = editing ? { ...editing, ...form } : form;
    const response = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      setError("Could not save project.");
      return;
    }
    setItems((await response.json()) as Project[]);
    setError("");
    setEditing(null);
    setForm(empty);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        {error && <p className="text-sm text-pink-400 md:col-span-2">{error}</p>}
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="rounded bg-black/40 p-3" />
        <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="External link" className="rounded bg-black/40 p-3" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded bg-black/40 p-3 md:col-span-2" />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
          className="rounded bg-black/40 p-3"
        >
          <option>Web</option><option>Branding</option><option>Social</option><option>Video</option>
        </select>
        <input value={form.tags.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} placeholder="Tags (comma-separated)" className="rounded bg-black/40 p-3" />
        <div className="space-y-2">
          <p className="text-sm text-white/70">Image</p>
          <ImageUpload onUploaded={(path) => setForm({ ...form, image: path })} />
          <p className="text-xs text-white/50">{form.image}</p>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
        <button onClick={save} className="rounded bg-[#BEFF00] px-5 py-3 font-semibold text-black">{editing ? "Update" : "Add New Project"}</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-sm text-white/60"><tr><th className="p-3">Title</th><th>Category</th><th>Featured</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/10">
                <td className="p-3">{item.title}</td>
                <td>{item.category}</td>
                <td>{item.featured ? "Yes" : "No"}</td>
                <td className="p-3 space-x-3">
                  <button onClick={() => { setEditing(item); setForm({ ...item, tags: item.tags }); }} className="text-[#00F0FF]">Edit</button>
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this project?")) return;
                      const response = await fetch(`/api/projects?id=${item.id}`, { method: "DELETE" });
                      if (!response.ok) {
                        setError("Could not delete project.");
                        return;
                      }
                      setItems((await response.json()) as Project[]);
                      setError("");
                    }}
                    className="text-pink-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
