import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// components
import { HeaderWithMenu } from "components/Header";

const Auctions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Auctions | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/auctions" />
      </main>
    </>
  );
};

export default Auctions;
