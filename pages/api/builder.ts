import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import BuilderModel from "models/Builder";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, query } = req;

    await dbConnect();

    switch (method) {
      case "GET": {
        if (query.id) {
          const builder = await BuilderModel.findById(query.id);

          return res.status(200).json({
            builder,
          });
        }

        const builders = await BuilderModel.find();

        return res.status(200).json({
          builders,
        });
      }
      case "POST": {
        const builder = await BuilderModel.create(req.body);

        return res.status(200).json({
          builder,
        });
      }
      case "PATCH": {
        req.body.updatedAt = new Date();

        const builder = await BuilderModel.findByIdAndUpdate(
          req.body.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json({
          builder,
        });
      }
      case "DELETE": {
        const { id } = query;

        const builder = await BuilderModel.findByIdAndDelete(id);

        return res.status(200).json({
          builder,
        });
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
