'use strict';

const express = require('express');

const app = express();

const data = require('./db/notes');

const {PORT} = require('./config');

const {logRequests} = require('./middleware/logger');

app.use(express.static('public'));

app.use(logRequests);

app.get('/api/notes', (req, res) => {
    let query = req.query.searchTerm;
    // console.log(query);

    const searched = data.filter(function(item) {
        return item.title.includes(query) || item.content.includes(query);
    });

    res.json(query ? searched : data);
});

app.get('/api/notes/:id', (req, res) => {
    let note = data.find(function(note){
        return note.id == req.params.id;
    });
    res.json(note);
});

app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});
