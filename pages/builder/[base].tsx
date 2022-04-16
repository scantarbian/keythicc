import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
// components
import Head from "next/head";
import BuilderHeader from "components/builder/BuilderHeader";
import BuilderFooter from "components/builder/BuilderFooter";
import BuilderProvider from "contexts/BuilderContext";
import BuilderMain from "components/builder/BuilderMain";
// database
import dbConnect from "lib/mongo";
import ProductModel, { Product } from "models/Product";

const BuilderPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();

  const { product } = JSON.parse(data);

  return (
    <>
      <Head>
        <title>Keyboard Builder | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-special-grey ">
        <BuilderProvider baseKeyboard={product}>
          <BuilderHeader className="pt-10 px-10" />
          <BuilderMain />
          <BuilderFooter />
        </BuilderProvider>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await dbConnect();

  const product = await ProductModel.findById(query.base);

  return {
    props: {
      data: JSON.stringify({
        product,
      }),
    },
  };
};

export default BuilderPage;
