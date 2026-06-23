import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@bangun-ciptadana.id";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AdminBC2024!";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== ADMIN_EMAIL) return null;
        const ok = await bcrypt.compare(credentials.password, await bcrypt.hash(ADMIN_PASSWORD, 10));
        if (!ok) return null;
        return { id: "1", email: ADMIN_EMAIL, name: "Administrator" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "bangun-ciptadana-dev-secret-change-in-production-9f8e7d6c5b4a3",
};
