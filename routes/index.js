const express = require('express');
const router = express.Router();

router.get('/status/:code', (req, res, next) => {
    if (!isNaN(Number(req.params.code))) {
        res.status(Number(Number(req.params.code))).send();
    } else {
        res.status(404).send();
    }
});
// watch for xss :))
router.get('/tests/get/html', (req, res, next) => {
    res.send(`<html><body><h1>${req.query.title}</h1><br><p>${req.query.text}</p></body></html>`)
});

router.get('/tests/get/json', (req, res, next) => {
    res.json({
        "status": "ok",
        "message": `Thank you ${Math.floor(Math.random() * 1000)} times!. :)`,
        "query": req.query
    });
});

router.get('/tests/follow/:followUrl', (req, res, next) => {
  res.redirect(`http://${req.params.followUrl}`);
});


router.get('/docs', (req, res, next) => {
    let docs = `
    <html>
        <head>    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<title>AP Api Docs!.</title></head>
        <body>
            <h1>AP Documents :</h1>
            <table class="table table-bordered">
                <tr>
                <th>Method</th>               
                <th>Route</th>               
                <th>Test</th>
                <th>Response</th>               
               </tr>
               <tr>
                <td>GET</td>               
                <td>/status/:code</td>               
                <td>Status Code</td>               
                <td>Returns response with status code provided</td>               
               </tr>
                              <tr>
                <td>GET</td>               
                <td>/tests/get/html</td>               
                <td>Html response with name and text as query, otherwise undefined, no validation, feel free to exploit :)</td>               
                <td>Return html response</td>               
               </tr>
                              <tr>
                <td>GET</td>               
                <td>/tests/get/json</td>               
                <td>JSON response</td>               
                <td>Returns response with message and all query params entered.</td>               
               </tr>
                                             <tr>
                <td>GET</td>               
                <td>/tests/follow/:followUrl</td>               
                <td>Redirect / Follow Redirect test with status 302</td>               
                <td>Redirects user to followUrl param-USE ONLY DOMAIN NAME EXP:google.com, yahoo.com,portal.aut.ac.ir, DO NOT USE: http://google.com, yahoo.com/foo .</td>               
               </tr>
            </table>
        </body>
    </html>
    `
    res.send(docs);
});
module.exports = router;
