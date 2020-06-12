const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const bodyParser = require('body-parser');

router.post('/urlencoded', (req, res, next) => {
    if(req.headers['content-type'] === "application/x-www-form-urlencoded") {
        res.status(200).send(`Item created with new data = ${JSON.stringify(req.body)}`)
    } else {
        res.status(400).send(`Bad request content type. content type must be application/x-www-form-urlencoded but its ${req.headers['content-type']}`)
    }
});

router.post('/json', (req, res, next) => {
    if(req.headers['content-type'] === "application/json") {
        res.status(200).json({
            'message': `Item created.`,
            'new': req.body
        })
    } else {
        res.status(400).json({
            'message': `Bad request content type. content type must be application/json but its ${req.headers['content-type']}`
        })
    }
});

router.post('/formdata', upload.any(), (req, res, next) => {
    console.log('files:', req.files);
    console.log('body:', req.body);
    console.log('headers:', req.headers);
    if(req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
        res.status(200).send(JSON.stringify(req.files) + "\r\n" + JSON.stringify(req.body));
    } else {
        res.status(400).send(`Bad request content type. content type must be multipart/form-data but its ${req.headers['content-type']}`)
    }
});

router.post('/binary', bodyParser.raw({type: 'application/octet-stream'}), (req, res, next) => {
    console.log(req.body);
    if (req.headers['content-type'] === "application/octet-stream") {
        res.send(req.body);
    } else {
        res.status(400).send(`Bad request content type. content type must be application/octet-stream but its ${req.headers['content-type']}`)
    }
})
module.exports = router;