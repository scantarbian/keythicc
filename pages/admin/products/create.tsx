import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// hooks
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
// components
import Head from "next/head";
import Sidenav from "components/admin/Sidenav";
// data
import dbConnect from "lib/mongo";
import TypeMode, { Type } from "models/Type";
import CategoryModel, { Category } from "models/Category";

type Inputs = {
  name: string;
  description: string;
  basePrice: number;
  stock: number;
  footnotes: string;
};

const ProductsCreation: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth");
    },
  });

  // if not authorized, get out (throw to home page)
  if (session && session.user.administrator === false) {
    router.push("/");
  }

  const {
    types,
    categories,
  }: {
    types: [Type & { _id: string }];
    categories: [Category & { _id: string }];
  } = JSON.parse(data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Product Creation | KeyThicc</title>
        <meta name="description" content="Product Creation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/products" className="w-1/6 h-full" />
        <div className="w-5/6 flex flex-col h-full p-4">
          <div className="flex w-full gap-4">
            <a
              onClick={router.back}
              className="flex items-center px-4 py-2 mb-4 border-b-2 border-white hover:border-orange-400 hover:text-orange-400 hover:cursor-pointer"
            >
              <span>Return</span>
            </a>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}></form>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const types = await TypeMode.find();
  const categories = await CategoryModel.find();

  const data = JSON.stringify({
    types,
    categories,
  });

  return {
    props: {
      data,
    },
  };
};

export default ProductsCreation;
