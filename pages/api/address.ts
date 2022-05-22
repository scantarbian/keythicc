import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import AddressModel from "models/Address";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET": {
        if (req.query.id) {
          const address = await AddressModel.findById(req.query.id);

          return res.status(200).json({
            address,
          });
        }

        if (req.query.accountId) {
          const addresses = await AddressModel.find({
            account: req.query.accountId,
          });

          return res.status(200).json({
            addresses,
          });
        }

        if (req.query.email) {
          const addresses = await AddressModel.find({
            email: req.query.email,
          });

          return res.status(200).json({
            addresses,
          });
        }

        const addresses = await AddressModel.find();

        return res.status(200).json({
          addresses,
        });
      }
      case "POST": {
        const address = await AddressModel.create(req.body);

        return res.status(200).json({
          address,
        });
      }
      case "PATCH": {
        const address = await AddressModel.findByIdAndUpdate(
          req.body.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json({
          address,
        });
      }
      case "DELETE": {
        const { id } = req.query;

        const address = await AddressModel.findByIdAndDelete(id);

        return res.status(200).json({
          address,
        });
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
