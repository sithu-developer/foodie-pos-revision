// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NewMenuCategoryOptions, UpdatedMenuCateogryOptions } from '@/types/menuCategory';
import { prisma } from '@/util/db';
import { Company, User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const email = session.user?.email;
    if(!email) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "PUT") {
      const idFromRouter = Number(req.query.id);
      const { id , name , availabledLocationIds } = req.body as UpdatedMenuCateogryOptions;
      if(idFromRouter !== id || !name) return res.status(400).send("Bad request")
      const exist = await prisma.menuCategory.findUnique({ where : { id , isArchived : false}});
      if(!exist) return res.status(400).send("Bad request");
      const updatedMenuCategory = await prisma.menuCategory.update({ data : { name } , where : { id }});
      // for disabledLocationMenuCategory
      await prisma.disabledLocationMenuCategory.deleteMany({ where : { menuCategoryId : id }});
      const userId = (await prisma.user.findUnique({ where : { email }}) as User).id;
      const companyId = (await prisma.company.findFirst({ where : { userId }}) as Company).id;
      const locationIds = (await prisma.location.findMany({ where : { companyId }})).map(item => item.id);
      const disabledLocationIds = locationIds.filter(item => !availabledLocationIds.includes(item));
      const disabledLocationMenuCategories = await prisma.$transaction(
        disabledLocationIds.map(item => prisma.disabledLocationMenuCategory.create({ data : { menuCategoryId : id , locationId : item }}))
      );
      console.log(disabledLocationMenuCategories)
      return res.status(200).json({ updatedMenuCategory , disabledLocationMenuCategories });
    } else if(method === "POST") {
      const { name , availabledLocationIds , selectedLocationId } = req.body as NewMenuCategoryOptions;
      const isValid = name && selectedLocationId && availabledLocationIds;
      if(!isValid) return res.status(400).send("Bad request");
      const location = await prisma.location.findUnique({ where : { id : selectedLocationId }});
      if(!location) return res.status(400).send("Bad request");
      const newMenuCategory = await prisma.menuCategory.create({ data : { name , companyId : location.companyId }});
      const locations = await prisma.location.findMany({ where : { companyId : location.companyId , isArchived : false }});
      const allLocationIds = locations.map(item => item.id);
      const disabledLocationIds = allLocationIds.filter(item => !availabledLocationIds.includes(item));
      const disabledLocationMenuCategories = await prisma.$transaction(
        disabledLocationIds.map(item => prisma.disabledLocationMenuCategory.create({ data : { menuCategoryId : newMenuCategory.id , locationId : item }})) 
      );
      return res.status(200).json({ newMenuCategory , disabledLocationMenuCategories });
    }
  res.status(405).send("Invalid Method")
}
