require('dotenv').config()
let S3 = require('aws-sdk/clients/s3')
const fs = require('fs')


const access_key = process.env.AWS_ACCESS_KEY
const secret_key = process.env.AWS_SECRET_KEY
const bucket_name = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION


const s3 = new S3({
    region,
    access_key,
    secret_key
})

// uplaod file to s3
export function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParam = {
        Bucket: bucket_name,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParam).promise()
}


// download file from s3