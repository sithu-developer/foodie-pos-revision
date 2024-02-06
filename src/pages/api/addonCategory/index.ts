// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NewAddonCategoryOptions, UpdatedAddonCategoryOptions } from '@/types/addonCategory';
import { prisma } from '@/util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession( req , res , authOptions);
  if(!session) return res.status(401).send("unauthorized");
  const method = req.method;
  if(method === "POST") {
    const { name , menuIds , optional } = req.body as NewAddonCategoryOptions;
    const isValid = name && menuIds.length && optional !== undefined;
    if(!isValid) return res.status(400).send("Bad request");
    const addonCategory = await prisma.addonCategory.create({ data : { name , optional }});
    // menu <=> addonCategory
    const menuAddonCategories = await prisma.$transaction(
      menuIds.map(item => prisma.menuAddonCategory.create({ data : { menuId : item , addonCategoryId : addonCategory.id }}))
    );
    return res.status(200).json({ addonCategory , menuAddonCategories });
  } else if(method === "PUT") {
    const { id , menuIds , name , optional } = req.body as UpdatedAddonCategoryOptions;
    const isValid = id && menuIds.length && name && optional !== undefined;
    if(!isValid) return res.status(400).send("Bad request");
    const isExist = await prisma.addonCategory.findUnique({ where : { id , isArchived : false }});
    if(!isExist) return res.status(400).send("Bad request");
    const addonCategory = await prisma.addonCategory.update({ where : { id , isArchived : false } , data : { name , optional }});
    // menu <=> addonCategory
    await prisma.menuAddonCategory.deleteMany({ where : { addonCategoryId : id }});
    const menuAddonCategories = await prisma.$transaction(
      menuIds.map(item => prisma.menuAddonCategory.create({ data : { menuId : item , addonCategoryId : id }}))
    );
    return res.status(200).json({ addonCategory , menuAddonCategories });
  }

  res.status(405).send("Invalid Method");
}
