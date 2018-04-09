'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const main = $("#mainContainer");
const home = $("#homeContainer");
const about = $("#aboutContainer");
const portfolio = $("#portfolioContainer");
const contact = $("#contactContainer");

const homeSection = require('../templates/home.hbs');
const aboutSection = require('../templates/about.hbs');
const portfolioSection = require('../templates/portfolio.hbs');
const contactSection = require('../templates/contact.hbs');

const {getStrategy} = require('./model');

const clearAll = () => {
    portfolio.fadeOut();
    portfolio.empty();
    contact.fadeOut();
    contact.empty();
    about.fadeOut();
    about.empty();
    home.fadeOut();
    home.empty();
};

const homeAppend = () => {
    getStrategy().then(strategy => home.append(homeSection(strategy)));
    home.fadeIn();
};

const homeView = () => {
    clearAll();
    homeAppend();
    // home.append(homeSection);
    // home.fadeIn();
};

const aboutView = () => {
    clearAll();
    about.append(aboutSection);
    about.fadeIn();
};

const portfolioView = () => {
    clearAll();
    portfolio.append(portfolioSection);
    portfolio.fadeIn();
};

const contactView = () => {
    clearAll();
    contact.append(contactSection);
    contact.fadeIn();
};

module.exports = { homeAppend, homeView, aboutView, portfolioView, contactView };