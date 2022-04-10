import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// components
import Head from "next/head";

const BuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Keyboard Builder | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
};

export default BuilderPage;
