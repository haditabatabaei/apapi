const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});

router.patch('/json/:id', (req, res, next) => {
    if(!isNaN(req.params.id)) {
        if (req.headers['content-type'] === "application/json") {
            res.status(200).json({
                'message': `Item with id ${req.params.id} patched.`,
                'new': req.body
            })
        } else {
            res.status(400).json({
                'message': `Bad request content type. content type must be application/json but its ${req.headers['content-type']}`
            })
        }
    } else {
        res.status(404).json({
            'message': `Item with id ${req.params.id} not found.`,
            'new': null
        })
    }
});

router.patch('/formdata/:id', upload.any(), (req, res, next) => {
    if(!isNaN(req.params.id)) {
        if (req.headers['content-type'] && req.headers['content-type'].startsWith("multipart/form-data")) {
            res.status(200).send(`Item with id ${req.params.id} patched with new data = ${JSON.stringify(req.body)} | files = ${JSON.stringify(req.files)}`)
        } else {
            res.status(400).send(`Bad request content type. content type must be multipart/form-data but its ${req.headers['content-type']}`)
        }
    } else {
        res.status(404).send(`Item with id ${req.params.id} not found.`)
    }
});

router.patch('/urlencoded/:id', (req, res, next) => {
    if(!isNaN(req.params.id)) {
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            res.status(200).send(`Item with id ${req.params.id} patched with new data = ${JSON.stringify(req.body)}`)
        } else {
            res.status(400).send(`Bad request content type. content type must be application/x-www-form-urlencoded but its ${req.headers['content-type']}`)
        }
    } else {
        res.status(404).send(`Item with id ${req.params.id} not found.`)
    }
});

module.exports = router;