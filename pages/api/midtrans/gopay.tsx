import { NextApiRequest, NextApiResponse } from "next";
import midtrans from "lib/midtrans";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, body } = req;

    switch (method) {
      case "POST": {
        const chargeResponse = await midtrans.charge({
          chargeGopay: {
            payment_type: "gopay",
            transaction_details: {
              gross_amount: body.gross_amount,
              order_id: body.order_id,
            },
          },
        });

        res.status(200).json(chargeResponse);
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
