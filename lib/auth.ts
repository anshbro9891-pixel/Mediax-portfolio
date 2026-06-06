import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { timingSafeEqual } from "crypto";
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
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          email &&
          password &&
          email === adminEmail &&
          adminPassword &&
          safeEqual(password, adminPassword)
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

function safeEqual(input: string, secret: string) {
  const left = Buffer.from(input);
  const right = Buffer.from(secret);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
