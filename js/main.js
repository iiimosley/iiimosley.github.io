'use strict';

const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');

const { aboutAppend, homeView, aboutView, portfolioView, contactView, newFact } = require('./view');




(function pageLoad() {
    $('#aboutMobile>svg>path').css('fill', 'white');
    aboutAppend();
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

$('#stickyFooter>div').on('mousedown touchstart', (e) => {
    $(`#${e.currentTarget.id}>svg`).css('transform', 'scale(0.8)');
    $(`#stickyFooter>div>svg>path`).css('fill', 'rgb(60, 69, 78)');
});

$('#stickyFooter>div').on('mouseup touchend', (e)=>{
    $(`#${e.currentTarget.id}>svg`).css('transform', 'scale(1)');
    $(`#${e.currentTarget.id}>svg>path`).css('fill', 'white');
    // $(`#stickyFooter>div:not(#${e.currentTarget.id})>svg>path`).css('fill', 'rgb(60, 69, 78)');
});

$(document).on('mouseup', '#flexHead, #homeMobile', homeView);

$(document).on('mouseup', '#aboutLink, #aboutMobile', aboutView);

$(document).on('mouseup', '#portfolioLink, #portfolioMobile', portfolioView);

$(document).on('mouseup', '#contactLink, #contactMobile', contactView);

$(document).on('mouseup touchup', '#favBtn', newFact);

$(document).on('mouseover touchstart', '.btnFlash', ()=>{
    $('.btnFlash').removeAttr('class', 'btnFlash');
});

