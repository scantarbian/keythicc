import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// hooks
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// components
import Select from "react-select";
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
  type: {
    value: string;
    label: string;
  };
  category: {
    value: string;
    label: string;
  };
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
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        stock: data.stock,
        footnotes: data.footnotes,
        type: data.type.value,
        category: data.category.value,
      }),
    }).then((res) => {
      if (res.status === 200) {
        router.push("/admin/products");
      }
    });
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-black"
          >
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={types.map((type) => ({
                    value: type._id,
                    label: type.name,
                  }))}
                  placeholder="Select Type"
                  className="w-full"
                />
              )}
            />
            <div className="flex gap-4">
              <div className="w-1/4 text-white">
                <span>Image management</span>
              </div>
              <div className="flex flex-col gap-2 w-3/4">
                <input
                  type="text"
                  className="w-full"
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="Product name"
                />
                <textarea
                  className="w-full resize-none h-28"
                  {...register("description")}
                  placeholder="Product description"
                />
                <input
                  type="number"
                  className="w-full"
                  {...register("basePrice", {
                    required: true,
                  })}
                  placeholder="Product price"
                />
                <input
                  type="number"
                  className="w-full"
                  {...register("stock", {
                    required: true,
                  })}
                  placeholder="Product stock"
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categories.map((category) => ({
                        value: category._id,
                        label: category.name,
                      }))}
                      placeholder="Select Category"
                      className="w-full"
                    />
                  )}
                />
                <input
                  type="text"
                  className="w-full"
                  {...register("footnotes")}
                  placeholder="Footnotes"
                />
                <span>Rest of the form</span>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 mb-4 border-b-2 border-white hover:border-orange-400 hover:text-orange-400 text-white"
            >
              Create
            </button>
          </form>
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
