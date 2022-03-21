import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        console.log(profile);
        return {
          id: profile.id,
          googleId: profile.id,
          email: profile.email,
          fullname: `${profile.given_name} ${profile.family_name}`,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT-token", token);
      console.log("JWT-user", user);

      if (user) {
        token = {
          id: user.id,
          email: user.email,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log("SESSION-token", token);
      console.log("SESSION-user", user);
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
