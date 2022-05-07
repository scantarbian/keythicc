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
        const cardToken = await midtrans.cardToken({
          card_cvv: body.cvv,
          card_number: body.number,
          card_exp_month: body.expiry_month,
          card_exp_year: body.expiry_year,
          client_key: process.env.MIDTRANS_CLIENT_KEY,
        });

        if (!cardToken.token_id) {
          return res.status(400).json(cardToken);
        }
        console.log(cardToken);

        const chargeResponse = await midtrans.charge({
          chargeCreditCard: {
            payment_type: "credit_card",
            transaction_details: {
              gross_amount: body.gross_amount,
              order_id: body.order_id,
            },
            credit_card: {
              token_id: cardToken.token_id,
              authentication: true,
            },
          },
        });

        console.log(chargeResponse);

        return res.status(200).json(chargeResponse);
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.name,
      message: error.message,
    });
  }
}
