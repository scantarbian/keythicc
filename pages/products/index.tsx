import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
// components
import { HeaderWithMenu } from "components/Header";
import CategoryList from "components/products/CategoryList";
import CatalogDisplay from "components/products/CatalogDisplay";
// data
import dbConnect from "lib/mongo";
import CategoryModel, { Category } from "models/Category";
import ProductModel, { Product } from "models/Product";
import { Image } from "models/Image";

const Products: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<string>("");

  const {
    categories,
    products,
  }: {
    categories: [Category & { _id: string }];
    products: [Product & { _id: string; image: [Image & { _id: string }] }];
  } = JSON.parse(data);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategoryIndex(categories[0]._id);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Products Catalog | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <HeaderWithMenu current="/products" className="mb-10" />
        <div className="flex">
          <CategoryList
            categories={categories}
            active={activeCategoryIndex}
            onClick={(id) => setActiveCategoryIndex(id)}
            className="w-1/4"
          />
          <CatalogDisplay
            products={products}
            activeCategory={activeCategoryIndex}
            className="w-3/4"
          />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const categories = await CategoryModel.find();
  const products = await ProductModel.find();

  const data = JSON.stringify({
    categories,
    products,
  });

  return {
    props: {
      data,
    },
  };
};

export default Products;
