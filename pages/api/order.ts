import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import OrderModel from "models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET": {
      }
      case "POST": {
      }
      case "PATCH": {
      }
      case "DELETE": {
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
