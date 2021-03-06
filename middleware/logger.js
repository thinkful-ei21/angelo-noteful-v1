'use strict';

function logRequests(req, res, next) {
    const date = new Date();
    console.log(`time: ${date.toLocaleDateString()} ${date.toLocaleTimeString()} - method: ${req.method} - url: ${req.url}`);
    next();
}

module.exports = {logRequests};