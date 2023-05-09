// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET") {
    try {
      const product = await prisma.product.findFirst({
        where: {
          slug: req.query.slug as string,
        },
      });

      if (product) {
        //@ts-ignore
        res.status(200).json({ product });
      }
    } catch (error) {
      //@ts-ignore
      res.status(200).json({ message: error });
    } finally {
      prisma.$disconnect();
    }
  }
}
