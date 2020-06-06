const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const getTestsRouter = require('./routes/tests/get/index');
const postTestsRouter = require('./routes/tests/post/index');
const deleteTestsRouter = require('./routes/tests/delete/index');
const putTestsRouter = require('./routes/tests/put/index');
const patchTestsRouter = require('./routes/tests/patch/index');
const path = require('path')
const fs = require('fs');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
const app = express();
app.use(logger('combined', { stream: accessLogStream }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/tests/get', getTestsRouter);
app.use('/tests/post', postTestsRouter);
app.use('/tests/delete', deleteTestsRouter);
app.use('/tests/put', putTestsRouter);
app.use('/tests/patch', patchTestsRouter);

module.exports = app;
