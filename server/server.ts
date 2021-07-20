const express = require('express');
const cors = require('cors')
const multer = require('multer');
const app = express();


const { uploadFile, downloadFile } = require('./utils/s3.ts')

app.use(cors())

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));

const upload = multer({
    dest: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
})

app.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    console.log('from AWS:', result)
    res.json({ msg: 'working' })
})

app.get('/image/:id', async (req, res) => {
    const id = req.params.id
    const img = await downloadFile(id)
    res.send(`<img src="${img.Body}" height="100"/>`)
})



app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening on port ${process.env.PORT || 3002}`)
})