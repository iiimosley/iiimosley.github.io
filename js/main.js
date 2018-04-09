'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const { homeAppend, homeView, aboutView, portfolioView, contactView } = require('./view');

(function pageLoad() {
    $('#homeMobile>svg>path').css('fill', 'white');
    homeAppend();
})();

const deselectTab = () => {
    $("#flexNav>li>a").removeClass("activeTab");
};

const selectTab = (e) => {
    deselectTab();
    $(e.target).addClass("activeTab");
};

$("#flexNav").on('click', (e)=>{
    selectTab(e);
});

$("#flexHead").on('click', deselectTab);

$('#stickyFooter>div').on('click', (e)=>{
    $(`#${e.currentTarget.id}>svg>path`).css('fill', 'white');
    $(`#stickyFooter>div:not(#${e.currentTarget.id})>svg>path`).css('fill', 'black');
});

$(document).on('click', '#flexHead, #homeMobile', homeView);

$(document).on('click', '#aboutLink, #aboutMobile', aboutView);

$(document).on('click', '#portfolioLink, #portfolioMobile', portfolioView);

$(document).on('click', '#contactLink, #contactMobile', contactView);

