'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const { aboutView, portfolioView, contactView } = require('./view');


$("#dropDown").click(function () {
    $("#dropContain").slideToggle(400, "swing");
});

const selectTab = (e) => {
    $("#flexNav>li>a").removeClass("activeTab");
    $(e.target).addClass("activeTab");
};

$("#flexNav").on('click', (e)=>{
    selectTab(e);
});


$(document).on('click', '#aboutLink, #aboutMobile', aboutView);

$(document).on('click', '#portfolioLink, #portfolioMobile', portfolioView);

$(document).on('click', '#contactLink, #contactMobile', contactView);