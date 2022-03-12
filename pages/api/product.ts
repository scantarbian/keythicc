import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import ProductModel from "models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET": {
        // handle presence of id queries
        if (req.query.id) {
          const product = await ProductModel.findById(req.query.id);

          return res.status(200).json({
            product,
          });
        }

        const products = await ProductModel.find();

        return res.status(200).json({
          products,
        });
      }
      case "POST": {
        const product = await ProductModel.create(req.body);

        return res.status(200).json({
          product,
        });
      }
      case "PATCH": {
        req.body.updatedAt = new Date();

        const product = await ProductModel.findByIdAndUpdate(
          req.body.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json({
          product,
        });
      }
      case "DELETE": {
        const product = await ProductModel.findByIdAndDelete(req.body.id);

        return res.status(200).json({
          product,
        });
      }
      default: {
        res.status(405).end();
      }
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
