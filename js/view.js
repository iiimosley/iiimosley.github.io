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


module.exports.aboutView = () => {
    portfolio.fadeOut();
    portfolio.empty();
    contact.fadeOut();
    contact.empty();
    about.append(aboutSection);
    about.fadeIn();
};

module.exports.portfolioView = () => {
    about.fadeOut();
    about.empty();
    contact.fadeOut();
    contact.empty();
    portfolio.append(portfolioSection);
    portfolio.fadeIn();
};

module.exports.contactView = () => {
    about.fadeOut();
    about.empty();
    portfolio.fadeOut();
    portfolio.empty();
    contact.append(contactSection);
    contact.fadeIn();
};