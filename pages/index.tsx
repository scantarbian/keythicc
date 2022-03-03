import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// components

import CarouselWrapper from "components/landing/Carousel";

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
        <title>Landing | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CarouselWrapper>
          <div className="flex gap-20 font-bold text-white mx-48">
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <a className=" hover:text-orange-400">{item.title}</a>
              </Link>
            ))}
          </div>
        </CarouselWrapper>
      </main>
    </>
  );
};

export default Home;
