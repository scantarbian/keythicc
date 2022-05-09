import type { NextApiRequest, NextApiResponse } from "next";

type BasicResponse = {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
};

interface CardFailureResponse extends BasicResponse {
  bank: string;
  eci: string;
  masked_card: string;
}

interface CardSuccessResponse extends BasicResponse {
  channel_response_code: string;
  channel_response_message: string;
  bank: string;
  eci: string;
  approval_code: string;
  masked_card: string;
  card_type: string;
  three_ds_version: string;
  challenge_completion: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const {
      method,
      body,
    }: {
      method?: string | undefined;
      body: CardFailureResponse | CardSuccessResponse;
    } = req;

    switch (method) {
      case "POST": {
        console.log(body);

        return res.status(200).json({
          status: "success",
        });
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
