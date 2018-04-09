'use strict';

const $ = require('jquery');

module.exports.getStrategy = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://crossorigin.me/http://brianeno.needsyourhelp.org/draw',
        })
        .done(strategy => resolve(strategy))
        .fail(error => reject(error));
    });
};


