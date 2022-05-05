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
        if (!query.province_id) {
          return res.status(400).json({
            error: "province_id is required",
          });
        }

        const cities = await fetch(
          `${process.env.SHIPPER_URL}/v3/location/cities?province_id=${query.province_id}&limit=100`,
          {
            method: "GET",
            headers: shipper(),
          }
        );

        return res.status(200).json(await cities.json());
      }

      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
