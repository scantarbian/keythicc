import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import CartModel from "models/Cart";

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
          const cart = await CartModel.findOne({
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
        const testExistence = await CartModel.findOne({
          account: body.account,
        });

        // only create a new cart if one doesn't exist
        // for the particular account
        if (testExistence !== null) {
          return res.status(200).json({
            message: "Cart already exists for this account.",
            cart: testExistence,
          });
        }

        const cart = await CartModel.create(body);

        return res.status(200).json({
          cart,
        });
      }
      case "PATCH": {
        if (query.accountId) {
          const cart = await CartModel.findOneAndUpdate(
            {
              account: query.accountId,
            },
            body,
            { new: true }
          );

          return res.status(200).json({
            cart,
          });
        }

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
