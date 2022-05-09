import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, body } = req;

    switch (method) {
      case "POST": {
        const callback = JSON.parse(body);

        console.log(callback);
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
