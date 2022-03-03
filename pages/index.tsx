import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// components
import Header from "components/landing/Header";
import Carousel from "components/landing/Carousel";

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
    <div className="h-screen">
      <Head>
        <title>Landing | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className="z-10 relative" />
      <main>
        <Carousel className="z-0" />
        <div className="flex gap-20 font-bold text-white mx-48 relative">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <a className=" hover:text-orange-400">{item.title}</a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
