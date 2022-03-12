import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import CategoryModel from "models/Category";

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
          const category = await CategoryModel.findById(req.query.id);

          return res.status(200).json({
            category,
          });
        }

        const categories = await CategoryModel.find();

        return res.status(200).json({
          categories,
        });
      }
      case "POST": {
        const category = await CategoryModel.create(req.body);

        return res.status(200).json({
          category,
        });
      }
      case "PATCH": {
        const category = await CategoryModel.findByIdAndUpdate(
          req.body.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json({
          category,
        });
      }
      case "DELETE": {
        const { id } = req.query;

        const category = await CategoryModel.findByIdAndDelete(id);

        return res.status(200).json({
          category,
        });
      }
      default:
        res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
