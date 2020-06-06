const express = require('express');
const router = express.Router();
const Jimp = require('jimp');

router.get('/status/:code', (req, res, next) => {
    if (!isNaN(Number(req.params.code))) {
        res.status(Number(req.params.code)).send();
    } else {
        res.status(404).send();
    }
});

router.get('/html', (req, res, next) => {
    res.header("Content-Type", "text/html").send(`<html><body><h1 style="color:${req.query.titlecolor}">${req.query.title}</h1><br><p style="color:${req.query.textcolor}">${req.query.text}</p></body></html>`)
});

router.get('/json', (req, res, next) => {
    res.json({
        "status": "ok",
        "message": `Thank you ${Math.floor(Math.random() * 1000)} times!. :)`,
        "query": req.query,
        "requestHeaders": req.headers
    });
});

router.get('/follow/:followUrl', (req, res, next) => {
    res.redirect(`http://${req.params.followUrl}`, 302);
});

router.get('/buffer/pic', async (req, res, next) => {
    let width = Number(req.query.width) || 150;
    let height = Number(req.query.height) || 150;
    let bgcolor = 'rgb(255, 0, 0)';
    if (req.query.bgcolor) {
        if (req.query.bgcolor.startsWith('rgb')) {
            bgcolor = req.query.bgcolor
        } else {
            bgcolor = `#${req.query.bgcolor}`;
        }
    }
    let text = req.query.text || 'Good Job';
    new Jimp(width, height, bgcolor, (err, img) => {
        if (err) {
            res.status(400).send({'message': 'Image creating failed.'});
        }
        Jimp
            .loadFont(Jimp.FONT_SANS_16_BLACK)
            .then(font => {
                img.print(font, width / 4, height / 4, text);
                img.getBuffer(Jimp.PNG_FILTER_AUTO, (err, buffer) => {
                    if (err) {
                        res.status(400).send({'message': 'Image creating failed.'});
                    }
                    res.header("Content-Type","image/png").end(buffer);
                })
            });
    });
});

router.get('/file', (req, res, next) => {
   res.sendFile(__dirname + '/haditabatabaei.txt');
});


module.exports = router;