import multer from "multer";
import s3Storage from "multer-s3";
import {S3Client} from "@aws-sdk/client-s3"
import { config } from "./config";

const s3Client = new S3Client({
    endpoint : config.endPoint,
    region : "sgp1",
    credentials : {
        accessKeyId : config.accessKeyId ,
        secretAccessKey : config.secretAccessKey ,
    }
})

export const fileUploadedFunction = multer({
    storage : s3Storage({
        s3 : s3Client,
        bucket : "msquarefdc",
        acl : "public-read",
        key(req, file, callback) {
            callback( null , `foodie-pos/sithunaing/${Date.now()}_${file.originalname}`)
        },
    })
}).array("files" , 1 )