// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
//@ts-ignore
import bcryptjs from "bcryptjs";

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    name,
    username,
    password,
    email,
  }: { name: string; username: string; password: string; email: string } =
    req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: bcryptjs.hashSync(password),
      },
    });
    res.status(201).json(user);
  } catch (error) {
    // @ts-ignore
    res.status(422).json({ message: "Usuario já cadastrado" });
  } finally {
    await prisma.$disconnect();
  }
}
