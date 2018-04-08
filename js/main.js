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

$('#stickyFooter>div').on('click', (e)=>{
    console.log(e.currentTarget.id);
    $(`#${e.currentTarget.id}>svg>path`).css('fill', 'white');
    // [...e.target.children].forEach(icon => {
    //     icon.style.fill = 'white';
    // });
    $(`#stickyFooter>div:not(#${e.currentTarget.id})>svg>path`).css('fill', 'black');
});

$(document).on('click', '#aboutLink, #aboutMobile', aboutView);

$(document).on('click', '#portfolioLink, #portfolioMobile', portfolioView);

$(document).on('click', '#contactLink, #contactMobile', contactView);