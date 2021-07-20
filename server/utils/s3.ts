require('dotenv').config()
let S3 = require('aws-sdk/clients/s3')
const fs = require('fs')


const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION



const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uplaod file to s3
const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}

// download file from s3
const downloadFile = (file) => {

    const downloadParams = {
        Bucket: bucketName,
        Key: file
    }
    return s3.getObject(downloadParams).promise()
}

exports.uploadFile = uploadFile
exports.downloadFile = downloadFile