import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useState } from "react";
// components
import { HeaderWithMenu } from "components/Header";
import CategoryList from "components/products/CategoryList";
// data
import dbConnect from "lib/mongo";
import CategoryModel, { Category } from "models/Category";

const Products: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const {
    categories,
  }: {
    categories: [Category & { _id: string }];
  } = JSON.parse(data);

  return (
    <>
      <Head>
        <title>Products | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <HeaderWithMenu current="/products" className="mb-10" />
        <div className="flex gap-20">
          <CategoryList
            categories={categories}
            active={activeCategoryIndex}
            onClick={(id) => setActiveCategoryIndex(id)}
            className="w-1/4"
          />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const categories = await CategoryModel.find();

  const data = JSON.stringify({
    categories,
  });

  return {
    props: {
      data,
    },
  };
};

export default Products;
