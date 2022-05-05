import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongo";
import AccountModel from "models/Account";
import bcrypt from "bcryptjs";

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
          const account = await AccountModel.findById(req.query.id);

          return res.status(200).json({
            success: true,
            account,
          });
        }

        // handle presence of email queries
        // used in validating shipping email
        if (req.query.email) {
          const account = await AccountModel.findOne({
            email: req.query.email,
          });

          if (account && account.password) {
            return res.status(200).json({
              success: true,
              password: true,
            });
          }

          if (account) {
            return res.status(200).json({
              success: true,
              password: false,
            });
          }

          return res.status(404).json({
            success: false,
            message: "Account not found",
          });
        }

        const accounts = await AccountModel.find();

        return res.status(200).json({
          accounts,
        });
      }
      case "POST": {
        // prevent duplicate account
        const verify = await AccountModel.findOne({
          email: req.body.email,
        });

        if (verify) {
          return res.status(400).json({
            error: "Account already exists",
          });
        }

        if (req.query.debug) {
          const account = await AccountModel.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password),
          });

          return res.status(200).json({
            success: true,
            account,
          });
        }

        const account = await AccountModel.create(req.body);

        return res.status(200).json({
          success: true,
          account,
        });
      }
      case "PATCH": {
        if (req.query.debug && req.body.password) {
          req.body.password = bcrypt.hashSync(req.body.password);
        }

        req.body.updatedAt = new Date();

        const account = await AccountModel.findByIdAndUpdate(
          req.body.id,
          req.body,
          {
            new: true,
          }
        );

        return res.status(200).json({
          account,
        });
      }
      case "DELETE": {
        const { id } = req.query;

        const account = await AccountModel.findByIdAndDelete(id);

        return res.status(200).json({
          account,
        });
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
