import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import ImageModel from "models/Image";

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
          const image = await ImageModel.findById(req.query.id);

          return res.status(200).json({
            image,
          });
        }

        const images = await ImageModel.find();

        return res.status(200).json({
          images,
        });
      }
      case "POST": {
        const image = await ImageModel.create(req.body);

        return res.status(200).json({
          image,
        });
      }
      case "PATCH": {
        const image = await ImageModel.findByIdAndUpdate(
          req.body.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json({
          image,
        });
      }
      case "DELETE": {
        const { id } = req.query;

        const image = await ImageModel.findByIdAndDelete(id);

        return res.status(200).json({
          image,
        });
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
