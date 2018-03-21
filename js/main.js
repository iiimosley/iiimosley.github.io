'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const { aboutView, portfolioView, contactView } = require('./view');


$("#dropDown").click(function () {
    $("#dropContain").slideToggle(400, "swing");
});

$(document).on('click', '#aboutLink, #aboutMobile', aboutView);

$(document).on('click', '#portfolioLink, #portfolioMobile', portfolioView);

$(document).on('click', '#contactLink, #contactMobile', contactView);