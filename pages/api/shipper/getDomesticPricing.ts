import type { NextApiRequest, NextApiResponse } from "next";
import { shipperPost } from "lib/fetchHeaders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, query } = req;

    switch (method) {
      case "GET": {
        if (!query.destination_area_id) {
          return res.status(400).json({
            error: "destination_area_id is required",
          });
        }

        if (!query.item_value) {
          return res.status(400).json({
            error: "item_value is required",
          });
        }

        const providers = await fetch(
          `${process.env.SHIPPER_URL}/v3/pricing/domestic`,
          {
            method: "POST",
            headers: shipperPost(),
            body: JSON.stringify({
              origin: {
                area_id: 4860,
              },
              destination: {
                area_id: Number(query.destination_area_id),
              },
              item_value: Number(query.item_value),
              height: 10,
              width: 10,
              length: 10,
              weight: 1,
              for_order: true,
              cod: false,
              sort_by: ["final_price"],
            }),
          }
        );

        return res.status(200).json(await providers.json());
      }

      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
