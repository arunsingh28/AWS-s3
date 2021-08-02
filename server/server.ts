import express from'express'
import cors from 'cors';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

import app = express();

const { uploadFile, downloadFile } = require('./utils/s3.ts')

app.use(cors())

app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
})


const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            // rename filename to be unique
            cb(null, Date.now().toString() + '-' + file.originalname)
        },
    })
})

// upload file
app.post('/file', upload.single('file'), async (req, res) => {
    const file = req.file
    console.log(file)
    console.log(`size of file is :${file.size / 1000000} MB`)
    res.json({ msg: 'working' })
})


// delete file
app.get('/file/:id', (req, res) => {
    const fileId = req.params.id
    console.log(fileId)
    s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileId,
    },
        (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })
    res.send('deleted')
})



app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening on port ${process.env.PORT || 3002}`)
})
