import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { credentialsSchema } from "@/lib/validations";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        mode: { label: "Mode", type: "text" }
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);

        if (!parsed.success) {
          throw new Error(parsed.error.errors[0]?.message || "Invalid credentials.");
        }

        const { email, password, name } = parsed.data;
        const mode = rawCredentials?.mode;

        if (mode === "signup") {
          const existingUser = await prisma.user.findUnique({ where: { email } });

          if (existingUser) {
            throw new Error("An account already exists for that email.");
          }

          const passwordHash = await bcrypt.hash(password, 12);
          const user = await prisma.user.create({
            data: {
              email,
              name,
              passwordHash
            }
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user?.passwordHash) {
          throw new Error("No credentials account found for that email.");
        }

        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordValid) {
          throw new Error("Incorrect email or password.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.onboardingDone = (user as { onboardingDone?: boolean }).onboardingDone ?? false;
      }

      return session;
    }
  }
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
