const express = require('express');
const router = express.Router();

router.delete('/', (req, res, body) => {
    res.status(204).send();
});

router.delete('/notfound', (req, res, next) => {
    res.status(404).send("Item not found.")
})

module.exports = router;