// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fileUploadedFunction } from '@/util/fileUploadedFunction'
import {Request , Response} from 'express'

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default function handler(
  req: Request,
  res: Response
) { 
    try{
        fileUploadedFunction(req , res , (err) => {
            if(err) {
                return res.status(500).send("Internal Server Error")
            }
            const files = req.files as Express.MulterS3.File[] ;;
            const file = files[0];
            const imgUrl = file.location;
            res.status(200).json({ imgUrl });
        })
    } catch (err) {
        console.log("lower8209 : " , err)
        return res.status(500).send("Internal Server Error")
    }

}
