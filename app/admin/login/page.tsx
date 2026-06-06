"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const response = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (response?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0A0A0A] p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="font-syne text-4xl font-extrabold">Admin Login</h1>
        <input required name="email" type="email" placeholder="Email" className="w-full rounded bg-black/40 p-3" />
        <input required name="password" type="password" placeholder="Password" className="w-full rounded bg-black/40 p-3" />
        {error && <p className="text-sm text-pink-400">{error}</p>}
        <button disabled={loading} className="w-full rounded-full bg-[#BEFF00] py-3 font-semibold text-black disabled:opacity-70">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
