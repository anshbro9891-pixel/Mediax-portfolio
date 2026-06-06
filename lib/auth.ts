import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (
          email &&
          password &&
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth: session, request }) => {
      if (!request.nextUrl.pathname.startsWith("/admin")) {
        return true;
      }
      if (request.nextUrl.pathname.startsWith("/admin/login")) {
        return true;
      }
      return !!session;
    },
  },
});

export async function requireAdminSession() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function hasAdminSession() {
  const session = await auth();
  return !!session;
}
