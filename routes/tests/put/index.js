const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const bodyParser = require('body-parser');

router.put('/:id', upload.any(), (req, res, next) => {
    console.log(req.body);
    if(!isNaN(req.params.id)) {
        res.status(200).send({
            'message': `Item with id ${req.params.id} edited.`,
            'new': req.body
        })
    } else {
        res.status(404).send({
            'message': `Item with id ${req.params.id} not found.`,
            'new': null
        })
    }
});

module.exports = router;