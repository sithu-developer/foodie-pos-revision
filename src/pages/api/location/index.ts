// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { CreateLocationOptions, DeleteLocationPermanentlyOptions, RestoreLocationOptions, UpdateLocationOptions } from '@/types/location';
import { prisma } from '@/util/db';
import { Company, User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
      const { name , street , township , city } = req.body as CreateLocationOptions;
      const isValid = name && street && township && city;
      if(!isValid) return res.status(400).send("Bad request");
      const email = session?.user?.email as string;
      const user = await prisma.user.findFirst({ where : { email , isArchived : false }}) as User;
      const company = await prisma.company.findFirst({ where : { userId : user.id  , isArchived : false}}) as Company;
      const location = await prisma.location.create({ data : { name , street , township , city , companyId : company.id}})
      return res.status(200).json({ location })
    } else if(method === "PUT") {
      const { isRestore } = req.body;
      if(isRestore) {
        const { id , isRestore } = req.body as RestoreLocationOptions;
        if(!id) return res.status(400).send("Bad request");
        const exist = await prisma.location.findUnique({ where : { id , isArchived : true }});
        if(!exist) return res.status(400).send("Bad request");
        const updatedLocation = await prisma.location.update({ where : { id } , data : { isArchived : false }})
        return res.status(200).json({ updatedLocation })
      } else {
        const { id , name , street , township , city } = req.body as UpdateLocationOptions;
        const isValid = id && name && street && township && city;
        if(!isValid) return res.status(400).send("Bad request");
        const exist = await prisma.location.findUnique({ where : { id , isArchived : false }});
        if(!exist) return res.status(400).send("Bad request");
        const updatedLocation = await prisma.location.update({ where : { id } , data : { name , street , township , city }});
        return res.status(200).json({ updatedLocation });
      }
    } else if(method === "DELETE") {
      const id = Number(req.query.id);
      if(!id ) return res.status(400).send("Bad request");
      const { isPermanent }  = req.body as DeleteLocationPermanentlyOptions;
      if(isPermanent) {
        const exist = await prisma.location.findUnique({ where : { id , isArchived : true }});
        if(!exist) return res.status(400).send("Bad request");
        const permanentlyDeletedLocation = await prisma.location.delete({where : { id }})
        return res.status(200).json({ permanentlyDeletedLocation })
      } else {
        const exist = await prisma.location.findUnique({ where : { id , isArchived : false }});
        if(!exist) return res.status(400).send("Bad request");
        const deletedLocation = await prisma.location.update({ where : { id } , data : { isArchived : true }});
        return res.status(200).json({ deletedLocation });
      }

    }
  res.status(405).send("Invalid Method")
}
