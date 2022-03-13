import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import TypeModel from "models/Type";

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
          const type = await TypeModel.findById(req.query.id);

          return res.status(200).json({
            type,
          });
        }

        const types = await TypeModel.find();

        return res.status(200).json({
          types,
        });
      }
      case "POST": {
        const type = await TypeModel.create(req.body);

        return res.status(200).json({
          type,
        });
      }
      case "PATCH": {
        const type = await TypeModel.findByIdAndUpdate(req.body.id, req.body, {
          new: true,
        });

        return res.status(200).json({
          type,
        });
      }
      case "DELETE": {
        const { id } = req.query;

        const type = await TypeModel.findByIdAndDelete(id);

        return res.status(200).json({
          type,
        });
      }
      default:
        res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
