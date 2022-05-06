import { MidtransClient } from "midtrans-node-client";

const core = new MidtransClient.CoreApi({
  isProduction: false,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export default core;
