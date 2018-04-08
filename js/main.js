'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const { aboutView, portfolioView, contactView } = require('./view');


const selectTab = (e) => {
    $("#flexNav>li>a").removeClass("activeTab");
    $(e.target).addClass("activeTab");
};

$("#flexNav").on('click', (e)=>{
    selectTab(e);
});

$('#stickyFooter>div').on('click', (e)=>{
    $(`#${e.currentTarget.id}>svg>path`).css('fill', 'white');
    $(`#stickyFooter>div:not(#${e.currentTarget.id})>svg>path`).css('fill', 'black');
});

$(document).on('click', '#aboutLink, #aboutMobile', aboutView);

$(document).on('click', '#portfolioLink, #portfolioMobile', portfolioView);

$(document).on('click', '#contactLink, #contactMobile', contactView);