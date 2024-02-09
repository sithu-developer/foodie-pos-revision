// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]';
import { NewTableOptions } from '@/types/table';
import { prisma } from '@/util/db';

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
        const { name , locationId } = req.body as NewTableOptions;
        const isValid = name && locationId;
        if(!isValid) return res.status(400).send("Bad request");
        const table = await prisma.table.create({ data : { name , locationId }});
        return res.status(200).json({ table });
    }
    res.status(405).send("Invalid method");
}
