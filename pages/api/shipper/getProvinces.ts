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
        if (!query.country_id) {
          return res.status(400).json({
            error: "country_id is required",
          });
        }

        const provinces = await fetch(
          `${process.env.SHIPPER_URL}/v3/location/provinces?country_id=${query.country_id}&limit=34`,
          {
            method: "GET",
            headers: shipper(),
          }
        );

        return res.status(200).json(await provinces.json());
      }

      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
