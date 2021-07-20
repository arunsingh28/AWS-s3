const express = require('express');
const cors = require('cors')
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const app = express();

const { uploadFile, downloadFile } = require('./utils/s3.ts')

app.use(cors())

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));

// aws access cred.
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
})

// upload to AWS bucket
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        // give public access to object         
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

app.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
    res.json({ msg: 'working' })
})


// fetch a file from s3
app.get('/image/:id', async (req, res) => {
    const id = req.params.id
    
})



app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening on port ${process.env.PORT || 3002}`)
})
