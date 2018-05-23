'use strict';

const express = require('express');

const app = express();
const morgan = require('morgan');
const notesRouter = require('./router/notes.router')
const {PORT} = require('./config');

const {logRequests} = require('./middleware/logger');

app.use(morgan('common'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api', notesRouter)

app.get('/boom', (req, res, next) => {
    throw new Error('Boom!');
});


app.use(function(req, res, next) {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});
