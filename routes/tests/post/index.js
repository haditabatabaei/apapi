const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const bodyParser = require('body-parser');

router.post('/', upload.any(), (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    console.log(req.headers);
    let contentType = req.headers['content-type'] || req.headers['Content-Type'];
    if(!contentType) {
      res.status(400).send("No content-type header provided")
    } else if (contentType === 'application/x-www-form-urlencoded') {
        res.status(200).header("X-requests-content-type", contentType).send("Post body with x-www-form-urlencoded received." + JSON.stringify(req.body));
    } else if (contentType.startsWith("multipart/form-data")) {
        res.status(200).header("X-requests-content-type", contentType).send("Post body with multipart/form-data received");
    } else if(contentType === 'application/json'){
        res.status(200).header("X-requests-content-type", contentType).send("Post body with application/json \r\n" + JSON.stringify(req.body))
    }
});

router.post('/formdata', upload.any(), (req, res, next) => {
    console.log('files:', req.files);
    console.log('body:', req.body);
    console.log('headers:', req.headers);
    res.status(200).send(JSON.stringify(req.files) + "\r\n" + JSON.stringify(req.body));
});

router.post('/binary', bodyParser.raw({type: '*/*'}), (req, res, next) => {
    console.log(req.body);
    res.send('Binary Data Received.');
})
module.exports = router;