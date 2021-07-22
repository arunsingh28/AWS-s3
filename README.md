# AWS-s3
create AWS s3 env with react on frontend and node.js on backend. setup s3 bucket  

for grabing info about object 

go to **`server/server.ts`** line number 37 

```
app.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
    res.json({ msg: 'working' })
})
```

```
{
  fieldname: 'image',
  originalname: 'sample.pdf',
  encoding: '7bit',
  mimetype: 'application/pdf',
  size: 3028,
  bucket: 'ts-module-2021',
  key: '1626799766632-sample.pdf',
  acl: 'public-read',
  contentType: 'application/octet-stream',
  contentDisposition: null,
  storageClass: 'STANDARD',
  serverSideEncryption: null,
  metadata: { fieldName: 'image' },
  location: 'https://ts-module-2021.s3.ap-south-1.amazonaws.com/1626799766632-sample.pdf',
  etag: '"4b41a3475132bd861b30a878e30aa56a"',
  versionId: 'PSlYEdDmzM9n.w5rpZrX0IRf2BU7iIFE'
}
``` 


this type output after uploading any file on [localhost:3000](http://localhost:3000) 


## Save file to database 

for saving file to DB you can save location to DB 

```
app.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file
    const newFile = new file({file: file.location})
    await newFile.save()
    res.json({ msg: 'working' })
})
```

## Filter file

for filtering file use `mimetype` like `console.log(req.file.mimetype)` this will give you type of that file 

```
mimetype: 'application/pdf'
mimetype: 'image/jpeg',
```


## Delete File

```
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
```

just pass key value to localhost:3002/file/[key_value]

## sample 

links look something given below 

`https://ts-module-2021.s3.amazonaws.com/1626802738371-sample.jpg`


