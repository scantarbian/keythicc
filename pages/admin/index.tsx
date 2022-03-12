import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <main className="text-white">This is administration dashboard</main>
    </>
  );
};

export default AdminHome;
