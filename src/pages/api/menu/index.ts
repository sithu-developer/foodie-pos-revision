// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { CreateMenuOptions } from '@/types/menu';
import { prisma } from '@/util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession( req , res , authOptions );
  if(!session) return res.status(401).send("unauthorized");
  const method = req.method;
  if(method === "POST") {
    const { name , detail , price , menuCategoryIds } = req.body as CreateMenuOptions;
    const isValid = name && detail !== undefined && price !== undefined && menuCategoryIds.length;
    if(!isValid) return res.status(400).send("Bad request");
    const newMenu = await prisma.menu.create({ data : { name , detail , price }});
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map(item => prisma.menuCategoryMenu.create({data : { menuId : newMenu.id , menuCategoryId : item }}))
    );
    return res.status(200).send({ newMenu , menuCategoryMenus });
  }

  res.status(405).send("Invalid method")
}
