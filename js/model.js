'use strict';

const $ = require('jquery');
// Access-Control-Allow-Origin: *;

// Response.headers

// data scraped from brianeno.needsyourhelp.org
// cross origin issues prevented ajax calls
module.exports.getStrategy = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../lib/ob.json',
        })
        .done(strategy => resolve(strategy))
        .fail(error => reject(error));
    });
};

module.exports.getFaves = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../lib/fav.json',
        })
        .done(faves => resolve(faves))
        .fail(error => reject(error));
    });
};

module.exports.getWork = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../lib/portfolio.json',
        })
        .done(works => resolve(works))
        .fail(error => reject(error));
    });
};