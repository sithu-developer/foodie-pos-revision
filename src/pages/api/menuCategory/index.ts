// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NewMenuCategoryOptions, UpdateMenuCateogryOptions } from '@/types/menuCategory';
import { prisma } from '@/util/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "PUT") {
        const idFromRouter = Number(req.query.id);
        const { id , name } = req.body as UpdateMenuCateogryOptions;
        if(idFromRouter !== id || !name) return res.status(400).send("Bad request")
        const exist = await prisma.menuCategory.findUnique({ where : { id , isArchived : false}});
        if(!exist) return res.status(400).send("Bad request");
        const updatedMenuCategory = await prisma.menuCategory.update({ data : { name } , where : { id }});
        return res.status(200).json({ updatedMenuCategory });
    } else if(method === "POST") {
      const { name , available } = req.body as NewMenuCategoryOptions;
      if(!name) return res.status(400).send("Bad request");
      // const menuCategory = await prisma.menuCategory.create({ data : { name , }})
    }
  res.status(405).send("Invalid Method")
}
