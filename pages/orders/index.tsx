import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
// components
import { HeaderWithMenu } from "components/Header";
import Search from "components/orders/Search";
// hooks
import { useSession } from "next-auth/react";

const Orders: NextPage = () => {
  const [orders, setOrders] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user) {
    }
  }, [session]);

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
                {status === "authenticated" ? `My Orders` : `Search Orders`}
              </a>
            </Link>
          </div>

          {/* Search bar when you're not logged in */}
          {status === "unauthenticated" && <Search />}

          {/* Order list when logged in */}
        </div>
      </main>
    </>
  );
};

export default Orders;
