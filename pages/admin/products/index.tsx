import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// components
import Link from "next/link";
import Head from "next/head";
import Sidenav from "components/admin/Sidenav";
import Table from "components/admin/products/Table";
// data
import dbConnect from "lib/mongo";
import ProductModel, { Product } from "models/Product";
import TypeMode, { Type } from "models/Type";
import CategoryModel, { Category } from "models/Category";

const ProductsHome: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth");
    },
  });

  if (session && session.user.administrator === false) {
    router.push("/");
  }

  const {
    products,
    types,
    categories,
  }: {
    products: [Product & { _id: string }];
    types: [Type & { _id: string }];
    categories: [Category & { _id: string }];
  } = JSON.parse(data);

  return (
    <>
      <Head>
        <title>Product Management | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/products" className="w-1/6 h-full" />
        <div className="w-5/6 flex flex-col h-full p-4">
          <div className="flex w-full justify-end gap-4">
            <Link href="/admin/products/create">
              <a className="flex items-center px-4 py-2 mb-4 border-b-2 border-white hover:border-orange-400 hover:text-orange-400">
                <span>Add Product</span>
              </a>
            </Link>
          </div>
          <Table products={products} types={types} categories={categories} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const products = await ProductModel.find();
  const types = await TypeMode.find();
  const categories = await CategoryModel.find();

  const data = JSON.stringify({
    products,
    types,
    categories,
  });

  return {
    props: {
      data,
    },
  };
};

export default ProductsHome;
