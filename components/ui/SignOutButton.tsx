"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="rounded bg-white/10 px-4 py-2 hover:bg-white/20">
      Sign out
    </button>
  );
}
