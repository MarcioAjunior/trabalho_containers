// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if ((req.method = "POST")) {
    console.log(req.body);
    try {
      const created_cart = await prisma.cart.create({
        data: {
          vl_total: 1000,
          status: "p",
          products: {
            create: [],
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const createCategory = await prisma.post.create({
    data: {
      title: "How to be Bob",
      categories: {
        create: [
          {
            assignedBy: "Bob",
            assignedAt: new Date(),
            category: {
              create: {
                name: "New category",
              },
            },
          },
        ],
      },
    },
  });
}
