import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";

// components
import { HeaderWithMenu } from "components/Header";
import Arrow from "public/images/Arrow.png";
import CartItem from "components/cart/CartItem";

const Cart: NextPage = () => {
  const { contents, getTotalPrice, getTotalQuantity, toggleSelectAll } =
    useContext(CartContext);

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
              <label className="font-semibold text-gray-50">
                <input
                  className="ml-8 m-5 h-7 w-7 border-2 border-yellow-500 bg-shark-500 checked:text-yellow-500 rounded-sm"
                  type="checkbox"
                  checked={contents.every((item) => item.selected)}
                  onChange={() => toggleSelectAll()}
                />
                Select All
              </label>
              {contents.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            <div className="col-start-8 gap-4 flex flex-col p-8 w-full col-span-3 bg-shark-500 self-start">
              <div className="flex bg-tuatara-500 rounded border-2 border-colonialwhite-500 ">
                <h2 className="p-2 text-sm font-basic text-colonialwhite-500">
                  Use Coupon Code or KeyThicc Points
                </h2>
                <Image className="m-10" src={Arrow} />
              </div>
              <h2 className=" text-2xl font-semibold text-gray-50">Summary</h2>
              <div className="flex justify-between">
                <p className=" text-lg font-light text-gray-50">
                  item price ({getTotalQuantity()} items)
                </p>
                <p className=" text-lg font-light text-gray-50">
                  Rp{getTotalPrice().toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" text-lg font-light text-manatee-500">
                  Total item discount
                </p>
                <p className="text-lg font-light text-manatee-500">-$22.50</p>
              </div>

              <hr className="w-full bg-manatee-500" />

              <div className="flex justify-between">
                <p className=" text-lg font-light text-gray-50">Total Price</p>
                <p className="text-lg font-light text-gray-50">
                  Rp{getTotalPrice().toLocaleString()}
                </p>
              </div>
              <Link href="/cart/checkout">
                <button
                  className={`text-center text-lg font-semibold text-black w-full p-4  ${
                    contents.length === 0
                      ? "opacity-50 cursor-not-allowed bg-gray-500"
                      : "bg-yellow-500 "
                  }`}
                  disabled={contents.length === 0}
                >
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
