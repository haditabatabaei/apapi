const express = require('express');
const router = express.Router();

router.patch('/:id', (req, res, next) => {
    if(!isNaN(req.params.id)) {
        res.status(200).send({
            'message': `Item with id ${req.params.id} patched.`,
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