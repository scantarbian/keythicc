import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
// components
import ShippingForm from "components/checkout/ShippingForm";
import PaymentForm from "components/checkout/PaymentForm";
import ItemList from "components/checkout/ItemList";

const Checkout: NextPage = ({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { phase, setPhase, carrier } = useContext(CartContext);

  const phaseSwitch = () => {
    switch (phase) {
      case "information":
        return <ShippingForm className="p-16" countries={countries} />;
      case "payment":
        return <PaymentForm className="p-16" />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>Cart | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-2">
        <div className="text-white pt-16 pl-16 flex flex-col gap-2">
          <span className="font-bold text-4xl ">KeyThicc</span>
          <div className="flex divide-x-2 font-bold">
            <span
              className="cursor-pointer px-2 hover:text-orange-400"
              onClick={() => router.back()}
            >
              {"<"}
            </span>
            <span
              className={`cursor-pointer px-2 hover:text-orange-400 ${
                phase === "information" ? "text-orange-400" : ""
              }`}
              onClick={() => setPhase("information")}
            >
              {"Information"}
            </span>
            <span
              className={`px-2 ${
                carrier > 0
                  ? phase === "payment"
                    ? "text-orange-400 cursor-pointer"
                    : "text-white cursor-pointer "
                  : "text-gray-500"
              }`}
              onClick={() => carrier > 0 && setPhase("payment")}
            >
              {"Ship & Pay"}
            </span>
          </div>
        </div>
        <span className="bg-special-grey pt-16 pr-16" />
        {phaseSwitch()}
        <ItemList className="p-16 bg-special-grey" />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const shipperHeaders = new Headers();

  shipperHeaders.append("X-API-Key", process.env.SHIPPER_API_KEY!);

  const countries: Array<{
    id: number;
    name: string;
    code: string;
  }> = await fetch(
    `${process.env.SHIPPER_URL}/v3/location/countries?limit=250`,
    {
      headers: shipperHeaders,
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return {
    props: {
      countries: countries,
    },
  };
};

export default Checkout;
