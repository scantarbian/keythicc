import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
// components
import Sidenav from "components/admin/Sidenav";

const AdminHome: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth");
    },
  });

  if (session && session.user.administrator === false) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Administration Dashboard | KeyThicc</title>
        <meta name="description" content="Administration Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin" className="w-1/6 h-full" />
      </main>
    </>
  );
};

export default AdminHome;
