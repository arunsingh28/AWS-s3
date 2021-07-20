const express = require('express');
const cors = require('cors')
const multer = require('multer');
const app = express();


app.use(cors())

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));

const upload = multer({
    dest: 'uploads/'
})

app.post('/image', upload.single('image'), (req, res) => {
    console.log(req.body)
    res.json({ msg: 'working' })
})





app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening on port ${process.env.PORT || 3002}`)
})