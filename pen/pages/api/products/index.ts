// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET") {
    try {
      const products = await prisma.product.findMany();
      //@ts-ignore
      res.status(200).json({ products });
    } catch (error) {
      //@ts-ignore
      res.status(402).json({ message: "Usuario já cadastrado" });
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method == "POST") {
    try {
      const { name, slug, price, mark, description } = req.body;
      const product = await prisma.product.create({
        data: {
          name: name,
          slug: slug,
          price: price,
          mark: mark,
          description: description,
        },
      });
      //@ts-ignore
      res.status(200).json({ product });
    } catch (error) {
      //@ts-ignore
      res.status(422).json({ message: error });
    }
  }
}
