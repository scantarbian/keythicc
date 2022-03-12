import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// components
import { HeaderWithMenu } from "components/Header";

const Products: NextPage = () => {
  return (
    <>
      <Head>
        <title>Products | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/products" />
      </main>
    </>
  );
};

export default Products;
