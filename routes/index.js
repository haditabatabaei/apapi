const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.headers);
    res.redirect('docs', 302);
});

router.get('/status/:code', (req, res, next) => {
    if(!isNaN(req.params.code)) {
        res.status(req.params.code).end();
    } else {
        res.status(404).end();
    }
});

router.get('/tests/follow/:followUrl', (req, res, next) => {
    res.redirect(`http://${req.params.followUrl}`);
})

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
                <td>Returns html response</td>
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
                <tr>
                <td>GET</td>
                <td>/tests/get/buffer/pic</td>
                <td>Buffered Image Test</td>
                <td>Buffered image | Query params: ?bgcolor=rgb(0,0,0)&width=150&height=150&text=GoodJob</td>
               </tr>
                <tr>
                <td>GET</td>
                <td>/tests/get/file</td>
                <td>TXT File</td>
                <td>Buffered File</td>
               </tr>
                <tr>
                <td>POST</td>
                <td>/tests/post</td>
                <td>Tests x-www-form-urlencoded</td>
                <td>-</td>
               </tr>
<tr>
                <td>POST</td>
                <td>/tests/post/formdata</td>
                <td>Tests multipart/form-data</td>
                <td>Upload and other fields using multipart/form-data</td>
               </tr>
<tr>
                <td>POST</td>
                <td>/tests/post/upload</td>
                <td>Tests application/octet-stream</td>
                <td>Upload binary data using application/octet-stream</td>
               </tr>
<tr>
                <td>DELETE</td>
                <td>/tests/delete/:id</td>
                <td>Tests delete method on request param id</td>
                <td>Returns 404 if :id is not a number | Success : 204 No Content | Body : null</td>
               </tr>
<tr>
                <td>PUT</td>
                <td>/tests/put/:id</td>
                <td>Tests put method on request param id | for body use multipart/form-data content type</td>
                <td>Returns 404 if :id is not a number | Success : {"message":"Item with id 10 edited.","new":{"name":"hadi"}}</td>
               </tr>
<tr>
                <td>PATCH</td>
                <td>/tests/patch/:id</td>
                <td>Tests patch method on request param id</td>
                <td>Returns 404 if :id is not a number | Success : {"message":"Item with id 10 patched.","new":{"name":"hadi"}}</td>
               </tr>
            </table>
        </body>
    </html>
    `
    res.send(docs);
});
module.exports = router;
