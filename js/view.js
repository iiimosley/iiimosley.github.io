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

const {getStrategy, getFave, getWork} = require('./model');

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

// on page load function
const aboutAppend = () => {
    about.append(aboutSection);
    about.fadeIn();
};

const homeView = () => {
    clearAll();
    home.append(homeSection(getStrategy()));
    home.fadeIn();
};

const aboutView = () => {
    clearAll();
    aboutAppend();
};

const portfolioView = () => {
    clearAll();
    portfolio.append(portfolioSection({objects: getWork()}));
    portfolio.fadeIn();
    $.parseHTML($(".workBrief"));
};

const contactView = () => {
    clearAll();
    contact.append(contactSection);
    contact.fadeIn();
};

const newFact = () => {
    let randomFav = getFave();
    $('#favTitleOut').html(`${randomFav.title}`);
    $('#favTextOut').html(`${randomFav.text}`);
};

module.exports = { aboutAppend, homeView, aboutView, portfolioView, contactView, newFact };