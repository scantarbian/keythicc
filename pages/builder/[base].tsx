import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// components
import Head from "next/head";
import BuilderHeader from "components/builder/BuilderHeader";
import BuilderProvider from "contexts/BuilderContext";

const BuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Keyboard Builder | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-special-grey pt-10 px-10">
        <BuilderProvider>
          <BuilderHeader />
        </BuilderProvider>
      </main>
    </>
  );
};

export default BuilderPage;
