const express = require('express');
const router = express.Router();

router.delete('/:id', (req, res, body) => {
    if(!isNaN(req.params.id)) {
        res.status(204).send();
    } else {
        res.status(404).end();
    }
});

module.exports = router;