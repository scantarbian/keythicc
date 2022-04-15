import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// components
import Head from "next/head";
import BuilderHeader from "components/builder/BuilderHeader";
import BuilderFooter from "components/builder/BuilderFooter";
import BuilderProvider from "contexts/BuilderContext";
import BuilderMain from "components/builder/BuilderMain";

const BuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Keyboard Builder | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-special-grey ">
        <BuilderProvider>
          <BuilderHeader className="pt-10 px-10" />
          <BuilderMain />
          <BuilderFooter />
        </BuilderProvider>
      </main>
    </>
  );
};

export default BuilderPage;
