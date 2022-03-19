import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
// components
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import TopImage from "public/images/bgatas.png";
import BottomImage from "public/images/bgbawah.png";
import SeePass from "public/images/SeePass.svg";
import Assemble from "public/images/assembleimg.svg";

type Inputs = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  if (session && session.user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Authentication | KeyThicc</title>
        <meta name="description" content="KeyThicc Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full bg-white text-center h-screen rounded">
        <div className="bg-white shadow-2xl flex">
          <div className="w-1/2 m-5 p-10 mx-10 flex flex-col">
            <Link href="/">
              <h1 className="text-3xl font-bold text-black-500 text-left mb-24">
                KeyThicc
              </h1>
            </Link>
            <form
              className="grid grid-col items-center mt-12 gap-0 h-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-3xl font-bold text-black-500 text-left mb-12 pr-20">
                Logout the past, Login <br></br> to the new!
              </h2>
              <p className="text-sm font-bold text-black-500 text-left mb-2">
                E-mail Address
              </p>
              <input
                type="email"
                placeholder=""
                className="bg-white border-2 border-gray-300 rounded text-xl p-2 w-full"
                {...register("email", {
                  required: true,
                })}
              />
              <div className="flex justify-between gap-8 mb-2 mt-6">
                <div className="items-center gap-2">
                  <span className="text-sm font-bold text-black-500 text-left">
                    Password
                  </span>
                </div>{" "}
                <a
                  className="text-sm font-normal text-blue-500 forgot"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                placeholder=""
                className="bg-white border-2 border-gray-300 rounded text-xl p-2 w-full"
                {...register("password", {
                  required: true,
                })}
              />

              <label className="flex items-center text-sm my-8 text-gray-500">
                <input
                  type="checkbox"
                  name="Remember"
                  className="border-2 rounded border-gray-300 mr-2"
                ></input>
                Remember my password
              </label>

              <div className="flex mt-4">
                <button
                  type="submit"
                  className="border-2 border-black-500 rounded text-white bg-black text-xl px-20 py-2 font-semibold hover:bg-green-500"
                >
                  Login
                </button>
              </div>

              <div className="flex justify-left gap-2 mt-12 mb-32">
                <span className="text-sm font-normal text-black-500 text-left mb-2">
                  Don&apos;t have an account?
                </span>
                <Link href="/auth/register">
                  <a className="text-sm font-normal text-blue-500">Sign Up</a>
                </Link>
              </div>
            </form>
          </div>
          <div className="w-1/2 bg-black text-white p-32">
            <div className="flex w-3/5 h-3/5 mx-auto">
              <Image src={Assemble} />
            </div>
            <div className="grid grid-col place-content-center w-full items-center gap-8 mt-32">
              <h2 className="text-4xl font-bold">KeyThicc</h2>
              <p className=" text-sm">
                The best place to get/sell your favorite keythicc machine
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
