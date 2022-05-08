import type { NextApiRequest, NextApiResponse } from "next";
import { shipperPost, shipper } from "lib/fetchHeaders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, query, body } = req;

    switch (method) {
      case "GET": {
        if (!query.id) {
          return res.status(400).json({
            error: "id is required",
          });
        }

        const order = await fetch(
          `${process.env.SHIPPER_URL}/v3/order/${query.id}`,
          {
            method: "GET",
            headers: shipper(),
          }
        );

        return res.status(200).json(await order.json());
      }
      case "POST": {
        const order = await fetch(`${process.env.SHIPPER_URL}/v3/order`, {
          method: "POST",
          headers: shipperPost(),
          body: JSON.stringify({
            ...body,
            consigner: {
              name: "KeyThicc Indonesia",
              phone_number: 6285866986929,
            },
          }),
        });

        return res.status(200).json(await order.json());
      }
      case "DELETE": {
        if (!query.id) {
          return res.status(400).json({
            error: "id is missing from query",
          });
        }

        if (!body.reason) {
          return res.status(400).json({
            error: "reason is missing from body",
          });
        }

        const order = await fetch(
          `${process.env.SHIPPER_URL}/v3/order/${query.id}`,
          {
            method: "DELETE",
            headers: shipperPost(),
            body: JSON.stringify(body),
          }
        );

        return res.status(200).json(await order.json());
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
