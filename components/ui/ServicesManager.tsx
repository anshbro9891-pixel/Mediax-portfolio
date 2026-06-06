"use client";

import type { Service } from "@/lib/data";
import { useState } from "react";

const empty: Omit<Service, "id"> = { icon: "Monitor", title: "", description: "", order: 1 };

export default function ServicesManager({ initialItems }: { initialItems: Service[] }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(empty);

  const save = async () => {
    const response = await fetch("/api/services", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...editing, ...form } : form),
    });
    setItems((await response.json()) as Service[]);
    setEditing(null);
    setForm(empty);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Icon name" className="rounded bg-black/40 p-3" />
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="rounded bg-black/40 p-3" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded bg-black/40 p-3 md:col-span-2" />
        <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} placeholder="Order" className="rounded bg-black/40 p-3" />
        <button onClick={save} className="rounded bg-[#BEFF00] px-5 py-3 font-semibold text-black">{editing ? "Update" : "Add New Service"}</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-sm text-white/60"><tr><th className="p-3">Title</th><th>Icon</th><th>Order</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/10">
                <td className="p-3">{item.title}</td><td>{item.icon}</td><td>{item.order}</td>
                <td className="p-3 space-x-3">
                  <button onClick={() => { setEditing(item); setForm({ ...item }); }} className="text-[#00F0FF]">Edit</button>
                  <button onClick={async () => { if (!confirm("Delete this service?")) return; const r = await fetch(`/api/services?id=${item.id}`, { method: "DELETE" }); setItems((await r.json()) as Service[]); }} className="text-pink-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
