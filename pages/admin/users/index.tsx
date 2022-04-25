import { NextPage } from "next";
// components
import Head from "next/head";
import Sidenav from "components/admin/Sidenav";

const UsersAdmin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Users Management | KeyThicc</title>
        <meta name="description" content="User Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/users" className="w-1/6 h-full" />
        <div className="w-5/6 flex flex-col h-full p-4"></div>
      </main>
    </>
  );
};

export default UsersAdmin;
