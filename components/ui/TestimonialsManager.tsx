"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import type { Testimonial } from "@/lib/data";
import { useState } from "react";

const empty: Omit<Testimonial, "id"> = { quote: "", name: "", company: "", rating: 5, photo: "/uploads/avatar-1.svg" };

export default function TestimonialsManager({ initialItems }: { initialItems: Testimonial[] }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const save = async () => {
    const response = await fetch("/api/testimonials", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...editing, ...form } : form),
    });
    if (!response.ok) {
      setError("Could not save testimonial.");
      return;
    }
    setItems((await response.json()) as Testimonial[]);
    setError("");
    setEditing(null);
    setForm(empty);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        {error && <p className="text-sm text-pink-400 md:col-span-2">{error}</p>}
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Client name" className="rounded bg-black/40 p-3" />
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="rounded bg-black/40 p-3" />
        <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="Quote" className="rounded bg-black/40 p-3 md:col-span-2" />
        <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="rounded bg-black/40 p-3" />
        <div>
          <ImageUpload onUploaded={(path) => setForm({ ...form, photo: path })} />
          <p className="text-xs text-white/50">{form.photo}</p>
        </div>
        <button onClick={save} className="rounded bg-[#BEFF00] px-5 py-3 font-semibold text-black">{editing ? "Update" : "Add New Testimonial"}</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-sm text-white/60"><tr><th className="p-3">Name</th><th>Company</th><th>Rating</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-white/10">
                <td className="p-3">{item.name}</td><td>{item.company}</td><td>{item.rating}</td>
                <td className="p-3 space-x-3">
                  <button onClick={() => { setEditing(item); setForm({ ...item }); }} className="text-[#00F0FF]">Edit</button>
                  <button onClick={async () => { if (!confirm("Delete this testimonial?")) return; const r = await fetch(`/api/testimonials?id=${item.id}`, { method: "DELETE" }); if (!r.ok) { setError("Could not delete testimonial."); return; } setItems((await r.json()) as Testimonial[]); setError(""); }} className="text-pink-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
