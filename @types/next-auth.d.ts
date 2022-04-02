import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account } from "models/Account";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Account & {
      _id: string;
    };
  }

  interface User {
    id: string;
    email: string;
    googleId?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    email: string;
    googleId?: string;
  }
}
