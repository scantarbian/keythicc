import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
// components
import Head from "next/head";
import Sidenav from "components/admin/Sidenav";
// data
import dbConnect from "lib/mongo";
import Table from "components/admin/orders/Table";
import OrderModel, { Order } from "models/Order";

const OrdersAdmin: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { orders }: { orders: [Order & { _id: string }] } = JSON.parse(data);

  return (
    <>
      <Head>
        <title>Orders Management | KeyThicc</title>
        <meta name="description" content="Order Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/orders" className="w-1/6 h-full" />

        <div className="w-5/6 flex flex-col h-full p-4">
          <Table orders={orders} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const orders = await OrderModel.find();

  return {
    props: {
      data: JSON.stringify({
        orders,
      }),
    },
  };
};

export default OrdersAdmin;
