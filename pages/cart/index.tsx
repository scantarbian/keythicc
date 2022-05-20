import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";

// components
import { HeaderWithMenu } from "components/Header";
import CartItem from "components/cart/CartItem";
import PriceInfo from "components/cart/PriceInfo";

const Cart: NextPage = () => {
  const { contents, toggleSelectAll } = useContext(CartContext);

  return (
    <>
      <Head>
        <title>Cart | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/cart" className="mb-10" />

        <div className="flex px-8">
          <div className=" grid grid-cols-12 gap-4 items-center">
            <h1 className="text-2xl font-semibold text-gray-50 col-span-12">
              My Cart
            </h1>

            <div className="w-full col-span-7 bg-shark-500 self-start divide-y-2">
              <label className="font-semibold text-gray-50 items-center flex">
                <input
                  className="ml-8 m-5 h-7 w-7 border-2 border-yellow-500 bg-shark-500 disabled:border-gray-500 checked:text-yellow-500 rounded-sm"
                  type="checkbox"
                  checked={
                    contents.length > 0 &&
                    contents.every((item) => item.selected)
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
        </div>
      </main>
    </>
  );
};

export default Cart;
