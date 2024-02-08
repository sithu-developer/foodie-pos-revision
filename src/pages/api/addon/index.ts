// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NewAddonOptions, UpdatedAddonOptions } from '@/types/addon'
import { prisma } from '@/util/db'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession( req , res , authOptions );
    if(!session) res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
        const { name , addonCategoryId , price } = req.body as NewAddonOptions;
        const isValid = name && price !== undefined && addonCategoryId;
        if(!isValid) return res.status(400).send("Bad request");
        const addon = await prisma.addon.create({ data : { name , price , addonCategoryId }});
        return res.status(200).json({ addon });
    } else if(method === "PUT") {
        const { id , name , addonCategoryId , price }  = req.body as UpdatedAddonOptions;
        const isValid = id && name && addonCategoryId && price !== undefined;
        if(!isValid) return res.status(400).send("Bad request");
        const isExist = await prisma.addon.findUnique({ where : { id , isArchived : false }});
        if(!isExist) return res.status(400).send("Bad request");
        const addon = await prisma.addon.update({ where : { id , isArchived : false } , data : { name , price , addonCategoryId }});
        return res.status(200).json({ addon })
    }

    res.status(405).send("Invalid method")
}
