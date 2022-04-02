import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// authentication suite
import bcrypt from "bcryptjs";
import AccountModel, { Account } from "models/Account";
import dbConnect from "lib/mongo";
import { isValidObjectId } from "mongoose";

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
        return {
          id: profile.sub,
          googleId: profile.sub,
          email: profile.email,
          fullname: profile.name,
          name: profile.name,
          image: profile.picture,
        };
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

        if (user.googleId) {
          token.fullname = user.fullname;
          token.googleId = user.googleId;
          token.image = user.image;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      let account:
        | (Account & {
            _id: string;
          })
        | null = null;

      if (isValidObjectId(token.id)) {
        // id from google will never be valid
        account = await AccountModel.findById(token.id);

        if (!account) {
          // check if email is registered (handle already registered google accounts)
          account = await AccountModel.findOne({
            email: token.email,
          });
        }

        if (account) {
          account.password = "";

          session.user = account;
        }
      } else if (token.googleId) {
        // create new account (handle google logins)
        account = await AccountModel.create({
          email: token.email,
          fullname: token.fullname,
          googleId: token.googleId,
          image: token.image,
          password: bcrypt.hashSync(token.googleId),
          verified: true,
        });

        account.password = "";

        session.user = account;
      } else {
        throw new Error(
          "[next-auth][error][custom][SESSION_CREATION_ERROR] Account not found"
        );
      }

      if (!session.user.fullname) {
        throw new Error(
          "[next-auth][error][custom][SESSION_CREATION_ERROR] Incomplete session data"
        );
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
