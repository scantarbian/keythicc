import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// authentication suite
import bcrypt from "bcryptjs";
import AccountModel from "models/Account";
import dbConnect from "lib/mongo";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          const user = await AccountModel.findOne({
            email: credentials?.email,
          });

          if (
            user &&
            bcrypt.compareSync(credentials?.password ?? "", user.password)
          ) {
            return {
              id: user._id.toString(),
              email: user.email,
            };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          id: user.id,
          email: user.email,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const account = await AccountModel.findById(token.id);

      if (account) {
        account.password = "";

        session.user = account;
      }

      return session; // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
});