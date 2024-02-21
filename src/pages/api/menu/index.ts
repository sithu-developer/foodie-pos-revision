// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { CreateMenuOptions, UpdateMenuOptions } from '@/types/menu';
import { prisma } from '@/util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession( req , res , authOptions );
  if(!session) return res.status(401).send("unauthorized");
  const method = req.method;

  if(method === "POST") {
    const { name , detail , price , menuCategoryIds , imgUrl } = req.body as CreateMenuOptions;
    const isValid = name && detail !== undefined && price !== undefined && menuCategoryIds.length;
    if(!isValid) return res.status(400).send("Bad request");
    const newMenu = await prisma.menu.create({ data : { name , detail , price , imgUrl }});
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map(item => prisma.menuCategoryMenu.create({data : { menuId : newMenu.id , menuCategoryId : item }}))
    );
    return res.status(200).send({ newMenu , menuCategoryMenus });
  } else if (method === "PUT") {
    const { id , menuCategoryIds , name , detail, price , imgUrl } = req.body as UpdateMenuOptions;
    const isValid = id && menuCategoryIds && name && detail !== undefined && price !== undefined;
    if(!isValid) return res.status(400).send("Bad request");
    const isExist = await prisma.menu.findUnique({ where : { id , isArchived : false }});
    if(!isExist) return res.status(400).send("Bad request");
    const updatedMenu = await prisma.menu.update({ where : { id } , data : { name , detail , price , imgUrl }});
    // menuCategory <-> menu
    await prisma.menuCategoryMenu.deleteMany({ where : { menuId : id }});
    const updatedMenuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map(item => prisma.menuCategoryMenu.create({data : { menuId : id , menuCategoryId : item }}))
    );
    res.status(200).send({ updatedMenu , updatedMenuCategoryMenus });
  }

  res.status(405).send("Invalid method")
}
