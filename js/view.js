'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const main = $("#mainContainer");
const about = $("#aboutContainer");
const portfolio = $("#portfolioContainer");
const contact = $("#contactContainer");


const aboutSection = require('../templates/about.hbs');
const portfolioSection = require('../templates/portfolio.hbs');
const contactSection = require('../templates/contact.hbs');

const clearAll = () => {
    portfolio.fadeOut();
    portfolio.empty();
    contact.fadeOut();
    contact.empty();
    about.fadeOut();
    about.empty();
};


module.exports.aboutView = () => {
    clearAll();
    about.append(aboutSection);
    about.fadeIn();
};

module.exports.portfolioView = () => {
    clearAll();
    portfolio.append(portfolioSection);
    portfolio.fadeIn();
};

module.exports.contactView = () => {
    clearAll();
    contact.append(contactSection);
    contact.fadeIn();
};