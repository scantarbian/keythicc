import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
// components
import Sidenav from "components/admin/Sidenav";

const ProductsHome: NextPage = () => {
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

  return (
    <>
      <Head>
        <title>Product Management | KeyThicc</title>
        <meta name="description" content="Product Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/products" className="w-1/6 h-full" />
        <div className="w-5/6 flex flex-col h-full">
          <div className="flex p-4 w-full justify-end">
            <Link href="/admin/products/create">
              <a className="flex items-center px-4 py-2 mb-4 border-b-2 border-white hover:border-orange-400 hover:text-orange-400">
                <span>Add Product</span>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsHome;
