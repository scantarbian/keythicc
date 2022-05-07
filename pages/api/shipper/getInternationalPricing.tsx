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
        if (!query.destination_country_id) {
          return res.status(400).json({
            error: "destination_country_id is required",
          });
        }

        if (!query.item_price) {
          return res.status(400).json({
            error: "item_price is required",
          });
        }

        const providers = await fetch(
          `${process.env.SHIPPER_URL}/v3/pricing/international`,
          {
            method: "POST",
            headers: shipperPost(),
            body: JSON.stringify({
              origin: {
                country_id: 228,
                area_id: 4860,
              },
              destination: {
                country_id: Number(query.destination_country_id),
              },
              item_price: Number(query.item_price),
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
