import type { NextApiRequest, NextApiResponse } from "next";
import { shipper } from "lib/fetchHeaders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, query } = req;

    switch (method) {
      case "GET": {
        if (!query.suburb_id) {
          return res.status(400).json({
            error: "city_id is required",
          });
        }

        const areas = await fetch(
          `${process.env.SHIPPER_URL}/v3/location/areas?suburb_id=${query.suburb_id}&limit=100`,
          {
            method: "GET",
            headers: shipper(),
          }
        );

        return res.status(200).json(await areas.json());
      }

      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
