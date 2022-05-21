import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { useSession } from "next-auth/react";

// components
import { HeaderWithMenu } from "components/Header";
import CartItem from "components/cart/CartItem";
import PriceInfo from "components/cart/PriceInfo";

const Cart: NextPage = () => {
  const { contents, toggleSelectAll } = useContext(CartContext);

  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Cart | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/cart" className="mb-10" />

        <div className=" grid grid-cols-12 gap-4 items-center px-8">
          <div className="col-span-12 flex divide-x">
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
          <div className="w-full col-span-7 bg-shark-500 self-start divide-y-2">
            <label className="font-semibold text-gray-50 items-center flex">
              <input
                className="ml-8 m-5 h-7 w-7 border-2 border-yellow-500 bg-shark-500 disabled:border-gray-500 checked:text-yellow-500 rounded-sm"
                type="checkbox"
                checked={
                  contents.length > 0 && contents.every((item) => item.selected)
                }
                onChange={() => toggleSelectAll()}
                disabled={contents.length === 0}
              />
              Select All
            </label>
            {contents.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
          <PriceInfo className="col-start-8 col-span-3 p-8 " />
        </div>
      </main>
    </>
  );
};

export default Cart;
