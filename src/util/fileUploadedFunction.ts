import multer from "multer";
import s3Storage from "multer-s3";
import {S3Client , PutObjectCommand } from "@aws-sdk/client-s3"
import { config } from "./config";
import QRCode from 'qrcode'

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
}).array("files" , 1 );

const generateQrCodeLink = ( locationId : number , tableId : number ) => {
    return `${config.orderAppUrl}/locationId=${locationId}&tableId=${tableId}`;
}

export const qrCodeUploadFunction = async( locationId : number , tableId : number ) => {
    const qrImageData = await QRCode.toDataURL(generateQrCodeLink( locationId , tableId ));
    const one  = new PutObjectCommand({
        Bucket : "msquarefdc",
        ACL : "public-read",
        Key : `/foodie-pos/sithunaing/qrcode/locationId-${locationId}-tableId-${tableId}.png`,
        Body : Buffer.from(
            qrImageData.replace(/^data:image\/\w+;base64,/ , "")
        )
    })
}

const tableLinkGenerationFunction = ( locationId : number , tableId : number ) => {
    return `${config.orderAppUrl}/locationId=${locationId}&tableId=${tableId}`;
}

export const qrCodeGenerateAndUploadFunciton = async( locationId : number , tableId : number ) => {
    const qrImageData = await QRCode.toDataURL(tableLinkGenerationFunction(locationId , tableId));
    const command = new PutObjectCommand({
        Bucket : "msquarefdc",
        ACL : "public-read",
        Key : `/foodie-pos/sithunaing/qrcode/locationId-${locationId}-tableId-${tableId}.png`,
        Body : Buffer.from(
            qrImageData.replace(/^data:image\/\w+;base64,/ , "")
        )
    })
    await s3Client.send(command);
}

export const qrIamgeLink = (locationId : number , tableId : number) => {
    return `msquarefdc/foodie-pos/sithunaing/qrcode/locationId-${locationId}-tableId-${tableId}.png`;
}