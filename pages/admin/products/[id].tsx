import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// database
import dbConnect from "lib/mongo";
import ProductModel, { Product } from "models/Product";
import TypeModel, { Type } from "models/Type";
import CategoryModel, { Category } from "models/Category";
import { Image as Img } from "models/Image";
// components
import Head from "next/head";
import Sidenav from "components/admin/Sidenav";
import Display from "components/admin/products/Display";
import TrackingTable from "components/admin/products/TrackingTable";

const ProductsDetailAdminView: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth");
    },
  });

  const {
    product,
    types,
    categories,
    baseKeycaps,
    baseSwitches,
  }: {
    product: Product & {
      _id: string;
      image: [Img & { _id: string }];
      type: Type & {
        _id: string;
      };
      baseKeycaps: Product & { _id: string };
      baseSwitches: Product & { _id: string };
    };
    types: [Type & { _id: string }];
    categories: [Category & { _id: string }];
    baseKeycaps: Array<Product & { _id: string }>;
    baseSwitches: Array<Product & { _id: string }>;
  } = JSON.parse(data);

  return (
    <>
      <Head>
        <title>{product.name} | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/products" className="w-1/6 h-full" />
        <div className="w-5/6 flex flex-col h-full p-4 gap-4">
          <div className="flex w-full justify-between gap-4">
            <a
              onClick={router.back}
              className="flex items-center px-4 py-2 mb-4 border-b-2 border-white hover:border-orange-400 hover:text-orange-400 hover:cursor-pointer"
            >
              <span>Return</span>
            </a>
            <a
              onClick={() => setEditMode(!editMode)}
              className="flex items-center px-4 py-2 mb-4 border-b-2 border-white hover:border-orange-400 hover:text-orange-400 hover:cursor-pointer"
            >
              <span>Edit Product</span>
            </a>
          </div>
          <Display
            product={product}
            categories={categories}
            types={types}
            baseKeycaps={baseKeycaps}
            baseSwitches={baseSwitches}
            editMode={editMode}
            setEditMode={setEditMode}
            router={router}
          />
          {/* {product.viewerHistory && (
            <TrackingTable viewerHistory={product.viewerHistory} />
          )} */}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await dbConnect();

  let product = null;

  try {
    product = await ProductModel.findById(query.id);

    if (!product) {
      throw new Error("Product not found");
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const types = await TypeModel.find();
  const categories = await CategoryModel.find();
  let baseKeycaps = null;
  let baseSwitches = null;

  // find supporting items
  if ("name" in product.type! && product.type.name === "Keyboard") {
    baseKeycaps = await ProductModel.find({
      type: types.find((type) => type.name === "Keycaps")?._id,
    });
    baseSwitches = await ProductModel.find({
      type: types.find((type) => type.name === "Switches")?._id,
    });
  }

  return {
    props: {
      data: JSON.stringify({
        product,
        types,
        categories,
        baseKeycaps,
        baseSwitches,
      }),
    },
  };
};

export default ProductsDetailAdminView;
