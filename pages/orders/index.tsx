import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// components
import { HeaderWithMenu } from "components/Header";

const Orders: NextPage = () => {
  return (
    <>
      <Head>
        <title>Orders | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/orders" className="mb-10" />

        <div className="flex flex-col px-8">
          <div className="flex divide-x">
            <Link href="/cart">
              <a className="text-2xl font-semibold text-gray-50 hover:text-yellow-500 px-4">
                My Cart
              </a>
            </Link>

            <Link href="/orders">
              <a className="text-2xl font-semibold text-gray-50 hover:text-yellow-500 px-4">
                My Orders
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Orders;
