import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
// components

const menuItems = [
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Auctions",
    href: "/auctions",
  },
  {
    title: "About Us",
    href: "/about",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Authentication | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
};

export default Home;
