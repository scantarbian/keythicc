import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import OrderModel from "models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, body, query } = req;

    await dbConnect();

    switch (method) {
      case "GET": {
        if (query.id) {
          const order = await OrderModel.findById(query.id);

          return res.status(200).json({
            order,
          });
        }

        if (query.accountId) {
          // sort descending by createdAt
          const orders = await OrderModel.find({
            account: query.accountId,
          }).sort({ createdAt: -1 });

          return res.status(200).json({
            orders,
          });
        }

        if (query.email) {
          const orders = await OrderModel.find({
            email: query.email,
          });

          return res.status(200).json({
            orders,
          });
        }

        const orders = await OrderModel.find();

        return res.status(200).json({
          orders,
        });
      }
      case "POST": {
        const order = await OrderModel.create(body);

        return res.status(200).json({
          order,
        });
      }
      case "PATCH": {
        const order = await OrderModel.findByIdAndUpdate(body.id, body, {
          new: true,
        });

        return res.status(200).json({
          order,
        });
      }
      case "DELETE": {
        const { id } = query;

        const order = await OrderModel.findByIdAndDelete(id);

        return res.status(200).json({
          order,
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
