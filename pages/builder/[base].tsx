import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// components
import Head from "next/head";
import { PhaseIndicator } from "components/builder/PhaseIndicator";
import BuilderProvider from "contexts/BuilderContext";

const BuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Keyboard Builder | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-special-grey px-8 pt-8">
        <BuilderProvider>
          <div className="flex w-full justify-between gap-20">
            <div className="text-white flex flex-col">
              <span className="font-bold text-4xl">Builder</span>
              <span>
                by <b>KeyThicc</b>
              </span>
            </div>
            <PhaseIndicator />
          </div>
        </BuilderProvider>
      </main>
    </>
  );
};

export default BuilderPage;
