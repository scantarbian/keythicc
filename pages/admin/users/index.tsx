import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// components
import Head from "next/head";
import Sidenav from "components/admin/Sidenav";
import Table from "components/admin/users/Table";
// data
import dbConnect from "lib/mongo";
import AccountModel, { Account } from "models/Account";

const UsersAdmin: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    accounts,
  }: {
    accounts: [Account & { _id: string }];
  } = JSON.parse(data);

  return (
    <>
      <Head>
        <title>Users Management | KeyThicc</title>
        <meta name="description" content="User Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white flex h-screen">
        <Sidenav active="/admin/users" className="w-1/6 h-full" />
        <div className="w-5/6 flex flex-col h-full p-4">
          <Table users={accounts} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const accounts = await AccountModel.find();

  return {
    props: {
      data: JSON.stringify({
        accounts,
      }),
    },
  };
};

export default UsersAdmin;
