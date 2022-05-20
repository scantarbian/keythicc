import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import CartModel from "models/Order";

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
          const cart = await CartModel.findById(query.id);

          return res.status(200).json({
            cart,
          });
        }

        if (query.accountId) {
          const cart = await CartModel.find({
            account: query.accountId,
          });

          return res.status(200).json({
            cart,
          });
        }

        const carts = await CartModel.find();

        return res.status(200).json({
          carts,
        });
      }
      case "POST": {
        const cart = await CartModel.create(body);

        return res.status(200).json({
          cart,
        });
      }
      case "PATCH": {
        const cart = await CartModel.findByIdAndUpdate(body.id, body, {
          new: true,
        });

        return res.status(200).json({
          cart,
        });
      }
      case "DELETE": {
        const { id } = query;

        const cart = await CartModel.findByIdAndDelete(id);

        return res.status(200).json({
          cart,
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
