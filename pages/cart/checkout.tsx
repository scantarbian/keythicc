import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
// components
import ShippingForm from "components/checkout/ShippingForm";
import ItemList from "components/checkout/ItemList";

const Checkout: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Cart | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-2">
        <div className="text-white pt-8 pl-8 flex flex-col gap-2">
          <span className="font-bold text-4xl ">KeyThicc</span>
          <span
            className="hover:cursor-pointer max-w-min hover:text-orange-400"
            onClick={() => router.back()}
          >
            return
          </span>
        </div>
        <span className="bg-special-grey pt-8 pr-8" />
        <ShippingForm className="p-8" />
        <ItemList className="p-8 bg-special-grey" />
      </main>
    </>
  );
};

export default Checkout;
