import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  })],
  callbacks: {
    async signIn({user}) {
      if (!user.email) {
        return false
      }
      // If there is an existing user with given email, they are signed in
      const matchedUser = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      })
      // If there is no existing user with given email, create account for user
      if (!matchedUser) {
        await prisma.user.create({
          data: {
            username: user.name || 'Anonymous',
            email: user.email,
            avatarUrl: user.image
          }
        })
      }
      return true
    },
    async jwt({token, profile}) {
      // On login, attach userId to jwt
      if (profile) {
        const matchedUser = await prisma.user.findUnique({
          where: {
            email: profile.email
          }
        })

        if (matchedUser) {
          token.id = matchedUser.id
        }
      }
      return token
    },
    async session({session, token}) {
      // Retrieve userId from token and attach it to session object
      if (session.user) {
        session.user.id = token.id //TODO: Type for user
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
