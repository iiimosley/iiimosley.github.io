(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./view":3,"hbsfy/runtime":25,"jquery":26}],2:[function(require,module,exports){
'use strict';

const $ = require('jquery');
const { ob } = require('../lib/ob');
const { fav } = require('../lib/fav');
const { portfolio } = require('../lib/portfolio');

const randomInt = (range) => Math.floor(Math.random() * +range);

// data scraped from brianeno.needsyourhelp.org
// cross origin issues prevented ajax calls
module.exports.getStrategy = () => ob[randomInt(ob.length)]; 

module.exports.getFave = () => fav[randomInt(fav.length)];

module.exports.getWork = () => portfolio;

},{"../lib/fav":4,"../lib/ob":5,"../lib/portfolio":6,"jquery":26}],3:[function(require,module,exports){
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
},{"../templates/about.hbs":27,"../templates/contact.hbs":28,"../templates/home.hbs":29,"../templates/portfolio.hbs":30,"./model":2,"hbsfy/runtime":25,"jquery":26}],4:[function(require,module,exports){
module.exports.fav = 
[
    {
        "title": "Favorite Cheese",
        "text": "Gouda <sub>Havarti in a close second</sub>"
    },
    {
        "title": "Favorite Kind of Beer",
        "text": "German <sub>(esp, Weissenstaphner)</sub>"
    },
    {
        "title": "Top 5 Films",
        "text": "<ol><li>Andrei Rublov <br><span class='director'>(Andrei Tarkovsky)</span></li><li>The Face of Another <br><span class='director'>(Hiroshi Teshigahara)</span></li><li>Marriage of Maria Braun <br><span class='director'>(Rainer Werner Fassbinder)</span></li><li>Red Beard <br><span class='director'>(Akira Kurosawa)</span></li><li>A Man Escaped <br><span class='director'>(Robert Bresson)</span></li></ol>"
    },
    {
        "title": "Favorite Templating Engine",
        "text": "Handlebars.Js <sub>(@key is sweeeeet)</sub>"
    },
    {
        "title": "Go-to Sushi Roll",
        "text": "Alaskan <sub>(salmon + avacado)</sub>"
    },
    {
        "title": "Favorite Spot to get Hot Chicken",
        "text": "Prince's <sub>(South Nashville)</sub>"
    },
    {
        "title": "Single vs Double Quotes",
        "text": " ☝️ "
    },
    {
        "title": "Favorite Episode of the Office",
        "text": "The Dinner Party"  
    },
    {
        "title": "Favorite Episode of Black Mirror",
        "text": "<strong>Tie:</strong> Black Museum + San Junipero"
    },
    {
        "title": "Most Rotated Brian Eno Album",
        "text": "Another Green World"
    },
    {
        "title": "Preferred Form of Caffeine",
        "text": "Cold Brew Coffee"
    },
    {
        "title": "Tacos vs Burrito",
        "text": "Tacos"
    },
    {
        "title": "Taco Protein of Choice",
        "text": "<strong>Tie:</strong> Al Pastor + Barbacoa"
    },
    {
        "title": "Preferred Form of Caffeine",
        "text": "Cold Brew Coffee"
    },
    {
        "title": "Favorite David Lynch Film",
        "text": "Wild At Heart"
    },
    {
        "title": "Preferred DAW",
        "text": "Ableton"
    },
    {
        "title": "Favorite Bowie Record",
        "text": "<strong>Tie:</strong> Low + Lodger + Station to Station"
    },
    {
        "title": "Favorite Trip Abroad",
        "text": "Barcelona"
    },
    {
        "title": "For || Against: IPA's",
        "text": "For; but, in serious moderation"
    },
    {
        "title": "Favorite Kubrick Film",
        "text": "Dr. Strangelove"
    },
    {
        "title": "Favorite Burger in Town",
        "text": "Gabby's"
    },
    {
        "title": "Favorite Sandwich Shop",
        "text": "Mitchell's"
    },
    {
        "title": "Favorite Character on Veep",
        "text": "Ben Cafferty"
    },
    {
        "title": "Favorite Walter Sobchak Quote",
        "text": "'You know, Dude, I myself dabbled in pacifism once. Not in 'Nam of course.'"
    },
    {
        "title": "In-town + outdoor rendevous of choice",
        "text": "Percy Warner Park"
    },
    {
        "title": "Fender vs Gibson",
        "text": "Fender"
    },
    {
        "title": "In-town + outdoor rendevous of choice",
        "text": "Percy Warner Park"
    },
    {
        "title": "What's typically in my pita...",
        "text": "Falafel"
    },
    {
        "title": "Pancakes vs Waffles",
        "text": "Waffles, all the way"
    },
    {
        "title": "Is a hotdog a sandwich?",
        "text": "<strong>NO.</strong>"
    },
    {
        "title": "What color is 'the dress?'",
        "text": "blue and black"
    },
    {
        "title": "Is water wet?",
        "text": "Yes, why would it not??"
    },
    {
        "title": "Spirit of Choice",
        "text": "<a href='https://en.wikipedia.org/wiki/Chartreuse_(liqueur)' target='_blank'>Chartreuse</a>"
    },
    {
        "title": "Favorite Miyazaki Film",
        "text": "Princess Mononoke"
    },
    {
        "title": "Favorite Episode of X-Files",
        "text": "<strong>Tie:</strong> Bad Blood + Die Hand Die Verletzt"
    }
]

},{}],5:[function(require,module,exports){
module.exports.ob = 
[
    {
        "id": 1,
        "edition": 1,
        "cardnumber": 1,
        "strategy": "Abandon normal instruments"
    },
    {
        "id": 2,
        "edition": 1,
        "cardnumber": 2,
        "strategy": "Accept advice"
    },
    {
        "id": 3,
        "edition": 1,
        "cardnumber": 3,
        "strategy": "Accretion"
    },
    {
        "id": 4,
        "edition": 1,
        "cardnumber": 4,
        "strategy": "A line has two sides"
    },
    {
        "id": 5,
        "edition": 1,
        "cardnumber": 5,
        "strategy": "Allow an easement (an easement is the abandonment of a stricture)"
    },
    {
        "id": 6,
        "edition": 1,
        "cardnumber": 6,
        "strategy": "Are there sections? Consider transitions"
    },
    {
        "id": 7,
        "edition": 1,
        "cardnumber": 7,
        "strategy": "Ask people to work against their better judgement"
    },
    {
        "id": 8,
        "edition": 1,
        "cardnumber": 8,
        "strategy": "Ask your body"
    },
    {
        "id": 9,
        "edition": 1,
        "cardnumber": 9,
        "strategy": "Assemble some of the instruments in a group and treat the group"
    },
    {
        "id": 10,
        "edition": 1,
        "cardnumber": 10,
        "strategy": "Balance the consistency principle with the inconsistency principle"
    },
    {
        "id": 11,
        "edition": 1,
        "cardnumber": 11,
        "strategy": "Be dirty"
    },
    {
        "id": 12,
        "edition": 1,
        "cardnumber": 12,
        "strategy": "Breathe more deeply"
    },
    {
        "id": 13,
        "edition": 1,
        "cardnumber": 13,
        "strategy": "Bridges -build -burn"
    },
    {
        "id": 14,
        "edition": 1,
        "cardnumber": 14,
        "strategy": "Cascades"
    },
    {
        "id": 15,
        "edition": 1,
        "cardnumber": 15,
        "strategy": "Change instrument roles"
    },
    {
        "id": 16,
        "edition": 1,
        "cardnumber": 16,
        "strategy": "Change nothing and continue with immaculate consistency"
    },
    {
        "id": 17,
        "edition": 1,
        "cardnumber": 17,
        "strategy": "Children's voices -speaking -singing"
    },
    {
        "id": 18,
        "edition": 1,
        "cardnumber": 18,
        "strategy": "Cluster analysis"
    },
    {
        "id": 19,
        "edition": 1,
        "cardnumber": 19,
        "strategy": "Consider different fading systems"
    },
    {
        "id": 20,
        "edition": 1,
        "cardnumber": 20,
        "strategy": "Consult other sources -promising -unpromising"
    },
    {
        "id": 21,
        "edition": 1,
        "cardnumber": 21,
        "strategy": "Convert a melodic element into a rhythmic element"
    },
    {
        "id": 22,
        "edition": 1,
        "cardnumber": 22,
        "strategy": "Courage!"
    },
    {
        "id": 23,
        "edition": 1,
        "cardnumber": 23,
        "strategy": "Cut a vital connection"
    },
    {
        "id": 24,
        "edition": 1,
        "cardnumber": 24,
        "strategy": "Decorate, decorate"
    },
    {
        "id": 25,
        "edition": 1,
        "cardnumber": 25,
        "strategy": "Define an area as 'safe' and use it as an anchor"
    },
    {
        "id": 26,
        "edition": 1,
        "cardnumber": 26,
        "strategy": "Destroy -nothing -the most important thing"
    },
    {
        "id": 27,
        "edition": 1,
        "cardnumber": 27,
        "strategy": "Discard an axiom"
    },
    {
        "id": 28,
        "edition": 1,
        "cardnumber": 28,
        "strategy": "Disconnect from desire"
    },
    {
        "id": 29,
        "edition": 1,
        "cardnumber": 29,
        "strategy": "Discover the recipes you are using and abandon them"
    },
    {
        "id": 30,
        "edition": 1,
        "cardnumber": 30,
        "strategy": "Distorting time"
    },
    {
        "id": 31,
        "edition": 1,
        "cardnumber": 31,
        "strategy": "Do nothing for as long as possible"
    },
    {
        "id": 32,
        "edition": 1,
        "cardnumber": 32,
        "strategy": "Don't be afraid of things because they're easy to do"
    },
    {
        "id": 33,
        "edition": 1,
        "cardnumber": 33,
        "strategy": "Don't be frightened of cliches"
    },
    {
        "id": 34,
        "edition": 1,
        "cardnumber": 34,
        "strategy": "Don't be frightened to display your talents"
    },
    {
        "id": 35,
        "edition": 1,
        "cardnumber": 35,
        "strategy": "Don't break the silence"
    },
    {
        "id": 36,
        "edition": 1,
        "cardnumber": 36,
        "strategy": "Don't stress one thing more than another"
    },
    {
        "id": 37,
        "edition": 1,
        "cardnumber": 37,
        "strategy": "Do something boring"
    },
    {
        "id": 38,
        "edition": 1,
        "cardnumber": 38,
        "strategy": "Do the washing up"
    },
    {
        "id": 39,
        "edition": 1,
        "cardnumber": 39,
        "strategy": "Do the words need changing?"
    },
    {
        "id": 40,
        "edition": 1,
        "cardnumber": 40,
        "strategy": "Do we need holes?"
    },
    {
        "id": 41,
        "edition": 1,
        "cardnumber": 41,
        "strategy": "Emphasise differences"
    },
    {
        "id": 42,
        "edition": 1,
        "cardnumber": 42,
        "strategy": "Emphasise repetitions"
    },
    {
        "id": 43,
        "edition": 1,
        "cardnumber": 43,
        "strategy": "Emphasise the flaws"
    },
    {
        "id": 44,
        "edition": 1,
        "cardnumber": 44,
        "strategy": "Faced with a choice, do both (given by Dieter Rot)"
    },
    {
        "id": 45,
        "edition": 1,
        "cardnumber": 45,
        "strategy": "Feedback recordings into an acoustic situation"
    },
    {
        "id": 46,
        "edition": 1,
        "cardnumber": 46,
        "strategy": "Fill every beat with something"
    },
    {
        "id": 47,
        "edition": 1,
        "cardnumber": 47,
        "strategy": "Get your neck massaged"
    },
    {
        "id": 48,
        "edition": 1,
        "cardnumber": 48,
        "strategy": "Ghost echoes"
    },
    {
        "id": 49,
        "edition": 1,
        "cardnumber": 49,
        "strategy": "Give the game away"
    },
    {
        "id": 50,
        "edition": 1,
        "cardnumber": 50,
        "strategy": "Give way to your worst impulse"
    },
    {
        "id": 51,
        "edition": 1,
        "cardnumber": 51,
        "strategy": "Go slowly all the way round the outside"
    },
    {
        "id": 52,
        "edition": 1,
        "cardnumber": 52,
        "strategy": "Honor thy error as a hidden intention"
    },
    {
        "id": 53,
        "edition": 1,
        "cardnumber": 53,
        "strategy": "How would you have done it?"
    },
    {
        "id": 54,
        "edition": 1,
        "cardnumber": 54,
        "strategy": "Humanise something free of error"
    },
    {
        "id": 55,
        "edition": 1,
        "cardnumber": 55,
        "strategy": "Imagine the music as a moving chain or caterpillar"
    },
    {
        "id": 56,
        "edition": 1,
        "cardnumber": 56,
        "strategy": "Imagine the music as a set of disconnected events"
    },
    {
        "id": 57,
        "edition": 1,
        "cardnumber": 57,
        "strategy": "Infinitesimal gradations"
    },
    {
        "id": 58,
        "edition": 1,
        "cardnumber": 58,
        "strategy": "Intentions -credibility of -nobility of -humility of"
    },
    {
        "id": 59,
        "edition": 1,
        "cardnumber": 59,
        "strategy": "Into the impossible"
    },
    {
        "id": 60,
        "edition": 1,
        "cardnumber": 60,
        "strategy": "Is it finished?"
    },
    {
        "id": 61,
        "edition": 1,
        "cardnumber": 61,
        "strategy": "Is there something missing?"
    },
    {
        "id": 62,
        "edition": 1,
        "cardnumber": 62,
        "strategy": "Is the tuning appropriate?"
    },
    {
        "id": 63,
        "edition": 1,
        "cardnumber": 63,
        "strategy": "Just carry on"
    },
    {
        "id": 64,
        "edition": 1,
        "cardnumber": 64,
        "strategy": "Left channel, right channel, centre channel"
    },
    {
        "id": 65,
        "edition": 1,
        "cardnumber": 65,
        "strategy": "Listen in total darkness, or in a very large room, very quietly"
    },
    {
        "id": 66,
        "edition": 1,
        "cardnumber": 66,
        "strategy": "Listen to the quiet voice"
    },
    {
        "id": 67,
        "edition": 1,
        "cardnumber": 67,
        "strategy": "Look at a very small object, look at its centre"
    },
    {
        "id": 68,
        "edition": 1,
        "cardnumber": 68,
        "strategy": "Look at the order in which you do things"
    },
    {
        "id": 69,
        "edition": 1,
        "cardnumber": 69,
        "strategy": "Look closely at the most embarrassing details and amplify them"
    },
    {
        "id": 70,
        "edition": 1,
        "cardnumber": 70,
        "strategy": "Lowest common denominator check -single beat -single note -single riff"
    },
    {
        "id": 71,
        "edition": 1,
        "cardnumber": 71,
        "strategy": "Make a blank valuable by putting it in an exquisite frame"
    },
    {
        "id": 72,
        "edition": 1,
        "cardnumber": 72,
        "strategy": "Make an exhaustive list of everything you might do and do the last thing on the list"
    },
    {
        "id": 73,
        "edition": 1,
        "cardnumber": 73,
        "strategy": "Make a sudden, destructive unpredictable action; incorporate"
    },
    {
        "id": 74,
        "edition": 1,
        "cardnumber": 74,
        "strategy": "Mechanicalise something idiosyncratic"
    },
    {
        "id": 75,
        "edition": 1,
        "cardnumber": 75,
        "strategy": "Mute and continue"
    },
    {
        "id": 76,
        "edition": 1,
        "cardnumber": 76,
        "strategy": "Only one element of each kind"
    },
    {
        "id": 77,
        "edition": 1,
        "cardnumber": 77,
        "strategy": "(Organic) machinery"
    },
    {
        "id": 78,
        "edition": 1,
        "cardnumber": 78,
        "strategy": "Overtly resist change"
    },
    {
        "id": 79,
        "edition": 1,
        "cardnumber": 79,
        "strategy": "Put in earplugs"
    },
    {
        "id": 80,
        "edition": 1,
        "cardnumber": 80,
        "strategy": "Remember .those quiet evenings"
    },
    {
        "id": 81,
        "edition": 1,
        "cardnumber": 81,
        "strategy": "Remove ambiguities and convert to specifics"
    },
    {
        "id": 82,
        "edition": 1,
        "cardnumber": 82,
        "strategy": "Remove specifics and convert to ambiguities"
    },
    {
        "id": 83,
        "edition": 1,
        "cardnumber": 83,
        "strategy": "Repetition is a form of change"
    },
    {
        "id": 84,
        "edition": 1,
        "cardnumber": 84,
        "strategy": "Reverse"
    },
    {
        "id": 85,
        "edition": 1,
        "cardnumber": 85,
        "strategy": "Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap)"
    },
    {
        "id": 86,
        "edition": 1,
        "cardnumber": 86,
        "strategy": "Shut the door and listen from outside"
    },
    {
        "id": 87,
        "edition": 1,
        "cardnumber": 87,
        "strategy": "Simple subtraction"
    },
    {
        "id": 88,
        "edition": 1,
        "cardnumber": 88,
        "strategy": "Spectrum analysis"
    },
    {
        "id": 89,
        "edition": 1,
        "cardnumber": 89,
        "strategy": "Take a break"
    },
    {
        "id": 90,
        "edition": 1,
        "cardnumber": 90,
        "strategy": "Take away the elements in order of apparent non-importance"
    },
    {
        "id": 91,
        "edition": 1,
        "cardnumber": 91,
        "strategy": "Tape your mouth (given by Ritva Saarikko)"
    },
    {
        "id": 92,
        "edition": 1,
        "cardnumber": 92,
        "strategy": "The inconsistency principle"
    },
    {
        "id": 93,
        "edition": 1,
        "cardnumber": 93,
        "strategy": "The tape is now the music"
    },
    {
        "id": 94,
        "edition": 1,
        "cardnumber": 94,
        "strategy": "Think of the radio"
    },
    {
        "id": 95,
        "edition": 1,
        "cardnumber": 95,
        "strategy": "Tidy up"
    },
    {
        "id": 96,
        "edition": 1,
        "cardnumber": 96,
        "strategy": "Trust in the you of now"
    },
    {
        "id": 97,
        "edition": 1,
        "cardnumber": 97,
        "strategy": "Turn it upside down"
    },
    {
        "id": 98,
        "edition": 1,
        "cardnumber": 98,
        "strategy": "Twist the spine"
    },
    {
        "id": 99,
        "edition": 1,
        "cardnumber": 99,
        "strategy": "Use an old idea"
    },
    {
        "id": 100,
        "edition": 1,
        "cardnumber": 100,
        "strategy": "Use an unacceptable colour"
    },
    {
        "id": 101,
        "edition": 1,
        "cardnumber": 101,
        "strategy": "Use fewer notes"
    },
    {
        "id": 102,
        "edition": 1,
        "cardnumber": 102,
        "strategy": "Use filters"
    },
    {
        "id": 103,
        "edition": 1,
        "cardnumber": 103,
        "strategy": "Use 'unqualified' people"
    },
    {
        "id": 104,
        "edition": 1,
        "cardnumber": 104,
        "strategy": "Water"
    },
    {
        "id": 105,
        "edition": 1,
        "cardnumber": 105,
        "strategy": "What are you really thinking about just now? Incorporate"
    },
    {
        "id": 106,
        "edition": 1,
        "cardnumber": 106,
        "strategy": "What is the reality of the situation?"
    },
    {
        "id": 107,
        "edition": 1,
        "cardnumber": 107,
        "strategy": "What mistakes did you make last time?"
    },
    {
        "id": 108,
        "edition": 1,
        "cardnumber": 108,
        "strategy": "What would your closest friend do?"
    },
    {
        "id": 109,
        "edition": 1,
        "cardnumber": 109,
        "strategy": "What wouldn't you do?"
    },
    {
        "id": 110,
        "edition": 1,
        "cardnumber": 110,
        "strategy": "Work at a different speed"
    },
    {
        "id": 111,
        "edition": 1,
        "cardnumber": 111,
        "strategy": "You are an engineer"
    },
    {
        "id": 112,
        "edition": 1,
        "cardnumber": 112,
        "strategy": "You can only make one dot at a time"
    },
    {
        "id": 113,
        "edition": 1,
        "cardnumber": 113,
        "strategy": "You don't have to be ashamed of using your own ideas"
    },
    {
        "id": 114,
        "edition": 1,
        "cardnumber": 114,
        "strategy": "[blank white card]"
    },
    {
        "id": 115,
        "edition": 2,
        "cardnumber": 1,
        "strategy": "Abandon normal instruments"
    },
    {
        "id": 116,
        "edition": 2,
        "cardnumber": 2,
        "strategy": "Accept advice"
    },
    {
        "id": 117,
        "edition": 2,
        "cardnumber": 3,
        "strategy": "Accretion"
    },
    {
        "id": 118,
        "edition": 2,
        "cardnumber": 4,
        "strategy": "A line has two sides"
    },
    {
        "id": 119,
        "edition": 2,
        "cardnumber": 5,
        "strategy": "Allow an easement (an easement is the abandonment of a stricture)"
    },
    {
        "id": 120,
        "edition": 2,
        "cardnumber": 6,
        "strategy": "Always first steps"
    },
    {
        "id": 121,
        "edition": 2,
        "cardnumber": 7,
        "strategy": "Always give yourself credit for having more than personality (given by Arto Lindsay)"
    },
    {
        "id": 122,
        "edition": 2,
        "cardnumber": 8,
        "strategy": "Are there sections? Consider transitions"
    },
    {
        "id": 123,
        "edition": 2,
        "cardnumber": 9,
        "strategy": "Ask people to work against their better judgement"
    },
    {
        "id": 124,
        "edition": 2,
        "cardnumber": 10,
        "strategy": "Ask your body"
    },
    {
        "id": 125,
        "edition": 2,
        "cardnumber": 11,
        "strategy": "Assemble some of the instruments in a group and treat the group"
    },
    {
        "id": 126,
        "edition": 2,
        "cardnumber": 12,
        "strategy": "A very small object -Its centre"
    },
    {
        "id": 127,
        "edition": 2,
        "cardnumber": 13,
        "strategy": "Balance the consistency principle with the inconsistency principle"
    },
    {
        "id": 128,
        "edition": 2,
        "cardnumber": 14,
        "strategy": "Be dirty"
    },
    {
        "id": 129,
        "edition": 2,
        "cardnumber": 15,
        "strategy": "Be extravagant"
    },
    {
        "id": 130,
        "edition": 2,
        "cardnumber": 16,
        "strategy": "Breathe more deeply"
    },
    {
        "id": 131,
        "edition": 2,
        "cardnumber": 17,
        "strategy": "Bridges -build -burn"
    },
    {
        "id": 132,
        "edition": 2,
        "cardnumber": 18,
        "strategy": "Cascades"
    },
    {
        "id": 133,
        "edition": 2,
        "cardnumber": 19,
        "strategy": "Change instrument roles"
    },
    {
        "id": 134,
        "edition": 2,
        "cardnumber": 20,
        "strategy": "Change nothing and continue with immaculate consistency"
    },
    {
        "id": 135,
        "edition": 2,
        "cardnumber": 21,
        "strategy": "Children's voices -speaking -singing"
    },
    {
        "id": 136,
        "edition": 2,
        "cardnumber": 22,
        "strategy": "Cluster analysis"
    },
    {
        "id": 137,
        "edition": 2,
        "cardnumber": 23,
        "strategy": "Consider different fading systems"
    },
    {
        "id": 138,
        "edition": 2,
        "cardnumber": 24,
        "strategy": "Consult other sources -promising -unpromising"
    },
    {
        "id": 139,
        "edition": 2,
        "cardnumber": 25,
        "strategy": "Convert a melodic element into a rhythmic element"
    },
    {
        "id": 140,
        "edition": 2,
        "cardnumber": 26,
        "strategy": "Courage!"
    },
    {
        "id": 141,
        "edition": 2,
        "cardnumber": 27,
        "strategy": "Cut a vital connection"
    },
    {
        "id": 142,
        "edition": 2,
        "cardnumber": 28,
        "strategy": "Decorate, decorate"
    },
    {
        "id": 143,
        "edition": 2,
        "cardnumber": 29,
        "strategy": "Define an area as 'safe' and use it as an anchor"
    },
    {
        "id": 144,
        "edition": 2,
        "cardnumber": 30,
        "strategy": "Destroy -nothing -the most important thing"
    },
    {
        "id": 145,
        "edition": 2,
        "cardnumber": 31,
        "strategy": "Discard an axiom"
    },
    {
        "id": 146,
        "edition": 2,
        "cardnumber": 32,
        "strategy": "Disciplined self-indulgence"
    },
    {
        "id": 147,
        "edition": 2,
        "cardnumber": 33,
        "strategy": "Disconnect from desire"
    },
    {
        "id": 148,
        "edition": 2,
        "cardnumber": 34,
        "strategy": "Discover the recipes you are using and abandon them"
    },
    {
        "id": 149,
        "edition": 2,
        "cardnumber": 35,
        "strategy": "Distorting time"
    },
    {
        "id": 150,
        "edition": 2,
        "cardnumber": 36,
        "strategy": "Do nothing for as long as possible"
    },
    {
        "id": 151,
        "edition": 2,
        "cardnumber": 37,
        "strategy": "Don't be afraid of things because they're easy to do"
    },
    {
        "id": 152,
        "edition": 2,
        "cardnumber": 38,
        "strategy": "Don't be frightened of cliches"
    },
    {
        "id": 153,
        "edition": 2,
        "cardnumber": 39,
        "strategy": "Don't be frightened to display your talents"
    },
    {
        "id": 154,
        "edition": 2,
        "cardnumber": 40,
        "strategy": "Don't break the silence"
    },
    {
        "id": 155,
        "edition": 2,
        "cardnumber": 41,
        "strategy": "Don't stress *on* thing more than another (sic)"
    },
    {
        "id": 156,
        "edition": 2,
        "cardnumber": 42,
        "strategy": "Do something boring"
    },
    {
        "id": 157,
        "edition": 2,
        "cardnumber": 43,
        "strategy": "Do the washing up"
    },
    {
        "id": 158,
        "edition": 2,
        "cardnumber": 44,
        "strategy": "Do the words need changing?"
    },
    {
        "id": 159,
        "edition": 2,
        "cardnumber": 45,
        "strategy": "Do we need holes?"
    },
    {
        "id": 160,
        "edition": 2,
        "cardnumber": 46,
        "strategy": "Emphasise differences"
    },
    {
        "id": 161,
        "edition": 2,
        "cardnumber": 47,
        "strategy": "Emphasise repetitions"
    },
    {
        "id": 162,
        "edition": 2,
        "cardnumber": 48,
        "strategy": "Emphasise the flaws"
    },
    {
        "id": 163,
        "edition": 2,
        "cardnumber": 49,
        "strategy": "Faced with a choice, do both (given by Dieter Rot)"
    },
    {
        "id": 164,
        "edition": 2,
        "cardnumber": 50,
        "strategy": "Feed the recording back out of the medium"
    },
    {
        "id": 165,
        "edition": 2,
        "cardnumber": 51,
        "strategy": "Fill every beat with something"
    },
    {
        "id": 166,
        "edition": 2,
        "cardnumber": 52,
        "strategy": "Get your neck massaged"
    },
    {
        "id": 167,
        "edition": 2,
        "cardnumber": 53,
        "strategy": "Ghost echoes"
    },
    {
        "id": 168,
        "edition": 2,
        "cardnumber": 54,
        "strategy": "Give the game away"
    },
    {
        "id": 169,
        "edition": 2,
        "cardnumber": 55,
        "strategy": "Give way to your worst impulse"
    },
    {
        "id": 170,
        "edition": 2,
        "cardnumber": 56,
        "strategy": "Go outside. Shut the door."
    },
    {
        "id": 171,
        "edition": 2,
        "cardnumber": 57,
        "strategy": "Go slowly all the way round the outside"
    },
    {
        "id": 172,
        "edition": 2,
        "cardnumber": 58,
        "strategy": "Honor thy error as a hidden intention"
    },
    {
        "id": 173,
        "edition": 2,
        "cardnumber": 59,
        "strategy": "How would you have done it?"
    },
    {
        "id": 174,
        "edition": 2,
        "cardnumber": 60,
        "strategy": "Humanise something free of error"
    },
    {
        "id": 175,
        "edition": 2,
        "cardnumber": 61,
        "strategy": "Idiot glee (?)"
    },
    {
        "id": 176,
        "edition": 2,
        "cardnumber": 62,
        "strategy": "Imagine the piece as a set of disconnected events"
    },
    {
        "id": 177,
        "edition": 2,
        "cardnumber": 63,
        "strategy": "Infinitesimal gradations"
    },
    {
        "id": 178,
        "edition": 2,
        "cardnumber": 64,
        "strategy": "Intentions -credibility of -nobility of -humility of"
    },
    {
        "id": 179,
        "edition": 2,
        "cardnumber": 65,
        "strategy": "In total darkness, or in a very large room, very quietly"
    },
    {
        "id": 180,
        "edition": 2,
        "cardnumber": 66,
        "strategy": "Into the impossible"
    },
    {
        "id": 181,
        "edition": 2,
        "cardnumber": 67,
        "strategy": "Is it finished?"
    },
    {
        "id": 182,
        "edition": 2,
        "cardnumber": 68,
        "strategy": "Is the tuning intonation correct?"
    },
    {
        "id": 183,
        "edition": 2,
        "cardnumber": 69,
        "strategy": "Is there something missing?"
    },
    {
        "id": 184,
        "edition": 2,
        "cardnumber": 70,
        "strategy": "It is quite possible (after all)"
    },
    {
        "id": 185,
        "edition": 2,
        "cardnumber": 71,
        "strategy": "Just carry on"
    },
    {
        "id": 186,
        "edition": 2,
        "cardnumber": 72,
        "strategy": "Left channel, right channel, centre channel"
    },
    {
        "id": 187,
        "edition": 2,
        "cardnumber": 73,
        "strategy": "Listen to the quiet voice"
    },
    {
        "id": 188,
        "edition": 2,
        "cardnumber": 74,
        "strategy": "Look at the order in which you do things"
    },
    {
        "id": 189,
        "edition": 2,
        "cardnumber": 75,
        "strategy": "Look closely at the most embarrassing details and amplify them"
    },
    {
        "id": 190,
        "edition": 2,
        "cardnumber": 76,
        "strategy": "Lost in useless territory"
    },
    {
        "id": 191,
        "edition": 2,
        "cardnumber": 77,
        "strategy": "Lowest common denominator"
    },
    {
        "id": 192,
        "edition": 2,
        "cardnumber": 78,
        "strategy": "Make a blank valuable by putting it in an exquisite frame"
    },
    {
        "id": 193,
        "edition": 2,
        "cardnumber": 79,
        "strategy": "Make an exhaustive list of everything you might do and do the last thing on the list"
    },
    {
        "id": 194,
        "edition": 2,
        "cardnumber": 80,
        "strategy": "Make a sudden, destructive unpredictable action; incorporate"
    },
    {
        "id": 195,
        "edition": 2,
        "cardnumber": 81,
        "strategy": "Mechanicalise something idiosyncratic"
    },
    {
        "id": 196,
        "edition": 2,
        "cardnumber": 82,
        "strategy": "Mute and continue"
    },
    {
        "id": 197,
        "edition": 2,
        "cardnumber": 83,
        "strategy": "Not building a wall but making a brick"
    },
    {
        "id": 198,
        "edition": 2,
        "cardnumber": 84,
        "strategy": "Only one element of each kind"
    },
    {
        "id": 199,
        "edition": 2,
        "cardnumber": 85,
        "strategy": "(Organic) machinery"
    },
    {
        "id": 200,
        "edition": 2,
        "cardnumber": 86,
        "strategy": "Overtly resist change"
    },
    {
        "id": 201,
        "edition": 2,
        "cardnumber": 87,
        "strategy": "Put in earplugs"
    },
    {
        "id": 202,
        "edition": 2,
        "cardnumber": 88,
        "strategy": "Question the heroic approach"
    },
    {
        "id": 203,
        "edition": 2,
        "cardnumber": 89,
        "strategy": "Remember .those quiet evenings"
    },
    {
        "id": 204,
        "edition": 2,
        "cardnumber": 90,
        "strategy": "Remove ambiguities and convert to specifics"
    },
    {
        "id": 205,
        "edition": 2,
        "cardnumber": 91,
        "strategy": "Remove specifics and convert to ambiguities"
    },
    {
        "id": 206,
        "edition": 2,
        "cardnumber": 92,
        "strategy": "Repetition is a form of change"
    },
    {
        "id": 207,
        "edition": 2,
        "cardnumber": 93,
        "strategy": "Revaluation (a warm feeling)"
    },
    {
        "id": 208,
        "edition": 2,
        "cardnumber": 94,
        "strategy": "Reverse"
    },
    {
        "id": 209,
        "edition": 2,
        "cardnumber": 95,
        "strategy": "Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap)"
    },
    {
        "id": 210,
        "edition": 2,
        "cardnumber": 96,
        "strategy": "Simple subtraction"
    },
    {
        "id": 211,
        "edition": 2,
        "cardnumber": 97,
        "strategy": "Simply a matter of work"
    },
    {
        "id": 212,
        "edition": 2,
        "cardnumber": 98,
        "strategy": "Spectrum analysis"
    },
    {
        "id": 213,
        "edition": 2,
        "cardnumber": 99,
        "strategy": "State the problem in words as simply as possible"
    },
    {
        "id": 214,
        "edition": 2,
        "cardnumber": 100,
        "strategy": "Take a break"
    },
    {
        "id": 215,
        "edition": 2,
        "cardnumber": 101,
        "strategy": "Take away the elements in order of apparent non-importance"
    },
    {
        "id": 216,
        "edition": 2,
        "cardnumber": 102,
        "strategy": "Tape your mouth (given by Ritva Saarikko)"
    },
    {
        "id": 217,
        "edition": 2,
        "cardnumber": 103,
        "strategy": "The inconsistency principle"
    },
    {
        "id": 218,
        "edition": 2,
        "cardnumber": 104,
        "strategy": "The most important thing is the thing most easily forgotten"
    },
    {
        "id": 219,
        "edition": 2,
        "cardnumber": 105,
        "strategy": "The tape is now the music"
    },
    {
        "id": 220,
        "edition": 2,
        "cardnumber": 106,
        "strategy": "Think of the radio"
    },
    {
        "id": 221,
        "edition": 2,
        "cardnumber": 107,
        "strategy": "Tidy up"
    },
    {
        "id": 222,
        "edition": 2,
        "cardnumber": 108,
        "strategy": "Towards the insignificant"
    },
    {
        "id": 223,
        "edition": 2,
        "cardnumber": 109,
        "strategy": "Trust in the you of now"
    },
    {
        "id": 224,
        "edition": 2,
        "cardnumber": 110,
        "strategy": "Turn it upside down"
    },
    {
        "id": 225,
        "edition": 2,
        "cardnumber": 111,
        "strategy": "Twist the spine"
    },
    {
        "id": 226,
        "edition": 2,
        "cardnumber": 112,
        "strategy": "Use an old idea"
    },
    {
        "id": 227,
        "edition": 2,
        "cardnumber": 113,
        "strategy": "Use an unacceptable colour"
    },
    {
        "id": 228,
        "edition": 2,
        "cardnumber": 114,
        "strategy": "Use fewer notes"
    },
    {
        "id": 229,
        "edition": 2,
        "cardnumber": 115,
        "strategy": "Use filters"
    },
    {
        "id": 230,
        "edition": 2,
        "cardnumber": 116,
        "strategy": "Use 'unqualified' people"
    },
    {
        "id": 231,
        "edition": 2,
        "cardnumber": 117,
        "strategy": "Water"
    },
    {
        "id": 232,
        "edition": 2,
        "cardnumber": 118,
        "strategy": "What are the sections sections of? Imagine a caterpillar moving"
    },
    {
        "id": 233,
        "edition": 2,
        "cardnumber": 119,
        "strategy": "What are you really thinking about just now?"
    },
    {
        "id": 234,
        "edition": 2,
        "cardnumber": 120,
        "strategy": "What is the reality of the situation?"
    },
    {
        "id": 235,
        "edition": 2,
        "cardnumber": 121,
        "strategy": "What mistakes did you make last time?"
    },
    {
        "id": 236,
        "edition": 2,
        "cardnumber": 122,
        "strategy": "What would your closest friend do?"
    },
    {
        "id": 237,
        "edition": 2,
        "cardnumber": 123,
        "strategy": "What wouldn't you do?"
    },
    {
        "id": 238,
        "edition": 2,
        "cardnumber": 124,
        "strategy": "What would your closest friend do?"
    },
    {
        "id": 239,
        "edition": 2,
        "cardnumber": 125,
        "strategy": "Work at a different speed"
    },
    {
        "id": 240,
        "edition": 2,
        "cardnumber": 126,
        "strategy": "You are an engineer"
    },
    {
        "id": 241,
        "edition": 2,
        "cardnumber": 127,
        "strategy": "You can only make one dot at a time"
    },
    {
        "id": 242,
        "edition": 2,
        "cardnumber": 128,
        "strategy": "You don't have to be ashamed of using your own ideas"
    },
    {
        "id": 243,
        "edition": 2,
        "cardnumber": 129,
        "strategy": "[blank white card]"
    },
    {
        "id": 244,
        "edition": 3,
        "cardnumber": 1,
        "strategy": "Abandon normal instruments"
    },
    {
        "id": 245,
        "edition": 3,
        "cardnumber": 2,
        "strategy": "Accept advice"
    },
    {
        "id": 246,
        "edition": 3,
        "cardnumber": 3,
        "strategy": "Accretion"
    },
    {
        "id": 247,
        "edition": 3,
        "cardnumber": 4,
        "strategy": "A line has two sides"
    },
    {
        "id": 248,
        "edition": 3,
        "cardnumber": 5,
        "strategy": "Allow an easement (an easement is the abandonment of a stricture)"
    },
    {
        "id": 249,
        "edition": 3,
        "cardnumber": 6,
        "strategy": "Always first steps"
    },
    {
        "id": 250,
        "edition": 3,
        "cardnumber": 7,
        "strategy": "Are there sections? Consider transitions"
    },
    {
        "id": 251,
        "edition": 3,
        "cardnumber": 8,
        "strategy": "Ask people to work against their better judgement"
    },
    {
        "id": 252,
        "edition": 3,
        "cardnumber": 9,
        "strategy": "Ask your body"
    },
    {
        "id": 253,
        "edition": 3,
        "cardnumber": 10,
        "strategy": "Assemble some of the elements in a group and treat the group"
    },
    {
        "id": 254,
        "edition": 3,
        "cardnumber": 11,
        "strategy": "Balance the consistency principle with the inconsistency principle"
    },
    {
        "id": 255,
        "edition": 3,
        "cardnumber": 12,
        "strategy": "Be dirty"
    },
    {
        "id": 256,
        "edition": 3,
        "cardnumber": 13,
        "strategy": "Be extravagant"
    },
    {
        "id": 257,
        "edition": 3,
        "cardnumber": 14,
        "strategy": "Be less critical more often"
    },
    {
        "id": 258,
        "edition": 3,
        "cardnumber": 15,
        "strategy": "Breathe more deeply"
    },
    {
        "id": 259,
        "edition": 3,
        "cardnumber": 16,
        "strategy": "Bridges -build -burn"
    },
    {
        "id": 260,
        "edition": 3,
        "cardnumber": 17,
        "strategy": "Cascades"
    },
    {
        "id": 261,
        "edition": 3,
        "cardnumber": 18,
        "strategy": "Change instrument roles"
    },
    {
        "id": 262,
        "edition": 3,
        "cardnumber": 19,
        "strategy": "Change nothing and continue with immaculate consistency"
    },
    {
        "id": 263,
        "edition": 3,
        "cardnumber": 20,
        "strategy": "Children -speaking -singing"
    },
    {
        "id": 264,
        "edition": 3,
        "cardnumber": 21,
        "strategy": "Cluster analysis"
    },
    {
        "id": 265,
        "edition": 3,
        "cardnumber": 22,
        "strategy": "Consider different fading systems"
    },
    {
        "id": 266,
        "edition": 3,
        "cardnumber": 23,
        "strategy": "Consult other sources -promising -unpromising"
    },
    {
        "id": 267,
        "edition": 3,
        "cardnumber": 24,
        "strategy": "Courage!"
    },
    {
        "id": 268,
        "edition": 3,
        "cardnumber": 25,
        "strategy": "Cut a vital connection"
    },
    {
        "id": 269,
        "edition": 3,
        "cardnumber": 26,
        "strategy": "Decorate, decorate"
    },
    {
        "id": 270,
        "edition": 3,
        "cardnumber": 27,
        "strategy": "Define an area as 'safe' and use it as an anchor"
    },
    {
        "id": 271,
        "edition": 3,
        "cardnumber": 28,
        "strategy": "Destroy -nothing -the most important thing"
    },
    {
        "id": 272,
        "edition": 3,
        "cardnumber": 29,
        "strategy": "Discard an axiom"
    },
    {
        "id": 273,
        "edition": 3,
        "cardnumber": 30,
        "strategy": "Disciplined self-indulgence"
    },
    {
        "id": 274,
        "edition": 3,
        "cardnumber": 31,
        "strategy": "Disconnect from desire"
    },
    {
        "id": 275,
        "edition": 3,
        "cardnumber": 32,
        "strategy": "Discover the recipes you are using and abandon them"
    },
    {
        "id": 276,
        "edition": 3,
        "cardnumber": 33,
        "strategy": "Distorting time"
    },
    {
        "id": 277,
        "edition": 3,
        "cardnumber": 34,
        "strategy": "Do nothing for as long as possible"
    },
    {
        "id": 278,
        "edition": 3,
        "cardnumber": 35,
        "strategy": "Don't be afraid of things because they're easy to do"
    },
    {
        "id": 279,
        "edition": 3,
        "cardnumber": 36,
        "strategy": "Don't be frightened of cliches"
    },
    {
        "id": 280,
        "edition": 3,
        "cardnumber": 37,
        "strategy": "Don't be frightened to display your talents"
    },
    {
        "id": 281,
        "edition": 3,
        "cardnumber": 38,
        "strategy": "Don't break the silence"
    },
    {
        "id": 282,
        "edition": 3,
        "cardnumber": 39,
        "strategy": "Don't stress one thing more than another"
    },
    {
        "id": 283,
        "edition": 3,
        "cardnumber": 40,
        "strategy": "Do something boring"
    },
    {
        "id": 284,
        "edition": 3,
        "cardnumber": 41,
        "strategy": "Do the words need changing?"
    },
    {
        "id": 285,
        "edition": 3,
        "cardnumber": 42,
        "strategy": "Do we need holes?"
    },
    {
        "id": 286,
        "edition": 3,
        "cardnumber": 43,
        "strategy": "Emphasise differences"
    },
    {
        "id": 287,
        "edition": 3,
        "cardnumber": 44,
        "strategy": "Emphasise repetitions"
    },
    {
        "id": 288,
        "edition": 3,
        "cardnumber": 45,
        "strategy": "Emphasise the flaws"
    },
    {
        "id": 289,
        "edition": 3,
        "cardnumber": 46,
        "strategy": "Fill every beat with something"
    },
    {
        "id": 290,
        "edition": 3,
        "cardnumber": 47,
        "strategy": "From nothing to more than nothing"
    },
    {
        "id": 291,
        "edition": 3,
        "cardnumber": 48,
        "strategy": "Ghost echoes"
    },
    {
        "id": 292,
        "edition": 3,
        "cardnumber": 49,
        "strategy": "Give the game away"
    },
    {
        "id": 293,
        "edition": 3,
        "cardnumber": 50,
        "strategy": "Give way to your worst impulse"
    },
    {
        "id": 294,
        "edition": 3,
        "cardnumber": 51,
        "strategy": "Go outside. Shut the door."
    },
    {
        "id": 295,
        "edition": 3,
        "cardnumber": 52,
        "strategy": "Go slowly all the way round the outside"
    },
    {
        "id": 296,
        "edition": 3,
        "cardnumber": 53,
        "strategy": "Go to an extreme, move back to a more comfortable place"
    },
    {
        "id": 297,
        "edition": 3,
        "cardnumber": 54,
        "strategy": "Honor thy error as a hidden intention"
    },
    {
        "id": 298,
        "edition": 3,
        "cardnumber": 55,
        "strategy": "How would you have done it?"
    },
    {
        "id": 299,
        "edition": 3,
        "cardnumber": 56,
        "strategy": "Humanise something free of error"
    },
    {
        "id": 300,
        "edition": 3,
        "cardnumber": 57,
        "strategy": "Idiot glee (?)"
    },
    {
        "id": 301,
        "edition": 3,
        "cardnumber": 58,
        "strategy": "Imagine the piece as a set of disconnected events"
    },
    {
        "id": 302,
        "edition": 3,
        "cardnumber": 59,
        "strategy": "Infinitesimal gradations"
    },
    {
        "id": 303,
        "edition": 3,
        "cardnumber": 60,
        "strategy": "Intentions -nobility of -humility of -credibility of"
    },
    {
        "id": 304,
        "edition": 3,
        "cardnumber": 61,
        "strategy": "In total darkness, or in a very large room, very quietly"
    },
    {
        "id": 305,
        "edition": 3,
        "cardnumber": 62,
        "strategy": "Into the impossible"
    },
    {
        "id": 306,
        "edition": 3,
        "cardnumber": 63,
        "strategy": "Is it finished?"
    },
    {
        "id": 307,
        "edition": 3,
        "cardnumber": 64,
        "strategy": "Is the intonation correct?"
    },
    {
        "id": 308,
        "edition": 3,
        "cardnumber": 65,
        "strategy": "Is there something missing?"
    },
    {
        "id": 309,
        "edition": 3,
        "cardnumber": 66,
        "strategy": "It is quite possible (after all)"
    },
    {
        "id": 310,
        "edition": 3,
        "cardnumber": 67,
        "strategy": "Just carry on"
    },
    {
        "id": 311,
        "edition": 3,
        "cardnumber": 68,
        "strategy": "Listen to the quiet voice"
    },
    {
        "id": 312,
        "edition": 3,
        "cardnumber": 69,
        "strategy": "Look at the order in which you do things"
    },
    {
        "id": 313,
        "edition": 3,
        "cardnumber": 70,
        "strategy": "Look closely at the most embarrassing details and amplify them"
    },
    {
        "id": 314,
        "edition": 3,
        "cardnumber": 71,
        "strategy": "Lost in useless territory"
    },
    {
        "id": 315,
        "edition": 3,
        "cardnumber": 72,
        "strategy": "Lowest common denominator"
    },
    {
        "id": 316,
        "edition": 3,
        "cardnumber": 73,
        "strategy": "Make a blank valuable by putting it in an exquisite frame"
    },
    {
        "id": 317,
        "edition": 3,
        "cardnumber": 74,
        "strategy": "Make an exhaustive list of everything you might do and do the last thing on the list"
    },
    {
        "id": 318,
        "edition": 3,
        "cardnumber": 75,
        "strategy": "Make a sudden, destructive unpredictable action; incorporate"
    },
    {
        "id": 319,
        "edition": 3,
        "cardnumber": 76,
        "strategy": "Mechanicalise something idiosyncratic"
    },
    {
        "id": 320,
        "edition": 3,
        "cardnumber": 77,
        "strategy": "Mute and continue"
    },
    {
        "id": 321,
        "edition": 3,
        "cardnumber": 78,
        "strategy": "Not building a wall but making a brick"
    },
    {
        "id": 322,
        "edition": 3,
        "cardnumber": 79,
        "strategy": "Once the search is in progress, something will be found"
    },
    {
        "id": 323,
        "edition": 3,
        "cardnumber": 80,
        "strategy": "Only a part, not the whole"
    },
    {
        "id": 324,
        "edition": 3,
        "cardnumber": 81,
        "strategy": "Only one element of each kind"
    },
    {
        "id": 325,
        "edition": 3,
        "cardnumber": 82,
        "strategy": "(Organic) machinery"
    },
    {
        "id": 326,
        "edition": 3,
        "cardnumber": 83,
        "strategy": "Overtly resist change"
    },
    {
        "id": 327,
        "edition": 3,
        "cardnumber": 84,
        "strategy": "Question the heroic approach"
    },
    {
        "id": 328,
        "edition": 3,
        "cardnumber": 85,
        "strategy": "Remember .those quiet evenings"
    },
    {
        "id": 329,
        "edition": 3,
        "cardnumber": 86,
        "strategy": "Remove ambiguities and convert to specifics"
    },
    {
        "id": 330,
        "edition": 3,
        "cardnumber": 87,
        "strategy": "Remove specifics and convert to ambiguities"
    },
    {
        "id": 331,
        "edition": 3,
        "cardnumber": 88,
        "strategy": "Repetition is a form of change"
    },
    {
        "id": 332,
        "edition": 3,
        "cardnumber": 89,
        "strategy": "Retrace your steps"
    },
    {
        "id": 333,
        "edition": 3,
        "cardnumber": 90,
        "strategy": "Revaluation (a warm feeling)"
    },
    {
        "id": 334,
        "edition": 3,
        "cardnumber": 91,
        "strategy": "Reverse"
    },
    {
        "id": 335,
        "edition": 3,
        "cardnumber": 92,
        "strategy": "Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap)"
    },
    {
        "id": 336,
        "edition": 3,
        "cardnumber": 93,
        "strategy": "Simple subtraction"
    },
    {
        "id": 337,
        "edition": 3,
        "cardnumber": 94,
        "strategy": "Simply a matter of work"
    },
    {
        "id": 338,
        "edition": 3,
        "cardnumber": 95,
        "strategy": "State the problem in words as clearly as possible"
    },
    {
        "id": 339,
        "edition": 3,
        "cardnumber": 96,
        "strategy": "Take a break"
    },
    {
        "id": 340,
        "edition": 3,
        "cardnumber": 97,
        "strategy": "Take away the elements in order of apparent non-importance"
    },
    {
        "id": 341,
        "edition": 3,
        "cardnumber": 98,
        "strategy": "The inconsistency principle"
    },
    {
        "id": 342,
        "edition": 3,
        "cardnumber": 99,
        "strategy": "The most important thing is the thing most easily forgotten"
    },
    {
        "id": 343,
        "edition": 3,
        "cardnumber": 100,
        "strategy": "The tape is now the music"
    },
    {
        "id": 344,
        "edition": 3,
        "cardnumber": 101,
        "strategy": "Think of the radio"
    },
    {
        "id": 345,
        "edition": 3,
        "cardnumber": 102,
        "strategy": "Tidy up"
    },
    {
        "id": 346,
        "edition": 3,
        "cardnumber": 103,
        "strategy": "Towards the insignificant"
    },
    {
        "id": 347,
        "edition": 3,
        "cardnumber": 104,
        "strategy": "Trust in the you of now"
    },
    {
        "id": 348,
        "edition": 3,
        "cardnumber": 105,
        "strategy": "Turn it upside down"
    },
    {
        "id": 349,
        "edition": 3,
        "cardnumber": 106,
        "strategy": "Use an old idea"
    },
    {
        "id": 350,
        "edition": 3,
        "cardnumber": 107,
        "strategy": "Use an unacceptable colour"
    },
    {
        "id": 351,
        "edition": 3,
        "cardnumber": 108,
        "strategy": "Use fewer notes"
    },
    {
        "id": 352,
        "edition": 3,
        "cardnumber": 109,
        "strategy": "Use filters"
    },
    {
        "id": 353,
        "edition": 3,
        "cardnumber": 110,
        "strategy": "Use 'unqualified' people"
    },
    {
        "id": 354,
        "edition": 3,
        "cardnumber": 111,
        "strategy": "Water"
    },
    {
        "id": 355,
        "edition": 3,
        "cardnumber": 112,
        "strategy": "What are the sections sections of? Imagine a caterpillar moving"
    },
    {
        "id": 356,
        "edition": 3,
        "cardnumber": 113,
        "strategy": "What are you really thinking about just now?"
    },
    {
        "id": 357,
        "edition": 3,
        "cardnumber": 114,
        "strategy": "What is the reality of the situation?"
    },
    {
        "id": 358,
        "edition": 3,
        "cardnumber": 115,
        "strategy": "What mistakes did you make last time?"
    },
    {
        "id": 359,
        "edition": 3,
        "cardnumber": 116,
        "strategy": "What wouldn't you do?"
    },
    {
        "id": 360,
        "edition": 3,
        "cardnumber": 117,
        "strategy": "What would your closest friend do?"
    },
    {
        "id": 361,
        "edition": 3,
        "cardnumber": 118,
        "strategy": "Work at a different speed"
    },
    {
        "id": 362,
        "edition": 3,
        "cardnumber": 119,
        "strategy": "Would anybody want it?"
    },
    {
        "id": 363,
        "edition": 3,
        "cardnumber": 120,
        "strategy": "You are an engineer"
    },
    {
        "id": 364,
        "edition": 3,
        "cardnumber": 121,
        "strategy": "You can only make one dot at a time"
    },
    {
        "id": 365,
        "edition": 3,
        "cardnumber": 122,
        "strategy": "You don't have to be ashamed of using your own ideas"
    },
    {
        "id": 366,
        "edition": 3,
        "cardnumber": 123,
        "strategy": "[blank white card]"
    },
    {
        "id": 367,
        "edition": 4,
        "cardnumber": 1,
        "strategy": "Abandon desire"
    },
    {
        "id": 368,
        "edition": 4,
        "cardnumber": 2,
        "strategy": "Abandon normal instructions"
    },
    {
        "id": 369,
        "edition": 4,
        "cardnumber": 3,
        "strategy": "Accept advice"
    },
    {
        "id": 370,
        "edition": 4,
        "cardnumber": 4,
        "strategy": "Adding on"
    },
    {
        "id": 371,
        "edition": 4,
        "cardnumber": 5,
        "strategy": "A line has two sides"
    },
    {
        "id": 372,
        "edition": 4,
        "cardnumber": 6,
        "strategy": "Always the first steps"
    },
    {
        "id": 373,
        "edition": 4,
        "cardnumber": 7,
        "strategy": "Ask people to work against their better judgement"
    },
    {
        "id": 374,
        "edition": 4,
        "cardnumber": 8,
        "strategy": "Ask your body"
    },
    {
        "id": 375,
        "edition": 4,
        "cardnumber": 9,
        "strategy": "Be dirty"
    },
    {
        "id": 376,
        "edition": 4,
        "cardnumber": 10,
        "strategy": "Be extravagant"
    },
    {
        "id": 377,
        "edition": 4,
        "cardnumber": 11,
        "strategy": "Be less critical"
    },
    {
        "id": 378,
        "edition": 4,
        "cardnumber": 12,
        "strategy": "Breathe more deeply"
    },
    {
        "id": 379,
        "edition": 4,
        "cardnumber": 13,
        "strategy": "Bridges -build -burn"
    },
    {
        "id": 380,
        "edition": 4,
        "cardnumber": 14,
        "strategy": "Change ambiguities to specifics"
    },
    {
        "id": 381,
        "edition": 4,
        "cardnumber": 15,
        "strategy": "Change nothing and continue consistently"
    },
    {
        "id": 382,
        "edition": 4,
        "cardnumber": 16,
        "strategy": "Change specifics to ambiguities"
    },
    {
        "id": 383,
        "edition": 4,
        "cardnumber": 17,
        "strategy": "Consider transitions"
    },
    {
        "id": 384,
        "edition": 4,
        "cardnumber": 18,
        "strategy": "Courage!"
    },
    {
        "id": 385,
        "edition": 4,
        "cardnumber": 19,
        "strategy": "Cut a vital connection"
    },
    {
        "id": 386,
        "edition": 4,
        "cardnumber": 20,
        "strategy": "Decorate, decorate"
    },
    {
        "id": 387,
        "edition": 4,
        "cardnumber": 21,
        "strategy": "Destroy nothing; Destroy the most important thing"
    },
    {
        "id": 388,
        "edition": 4,
        "cardnumber": 22,
        "strategy": "Discard an axiom"
    },
    {
        "id": 389,
        "edition": 4,
        "cardnumber": 23,
        "strategy": "Disciplined self-indulgence"
    },
    {
        "id": 390,
        "edition": 4,
        "cardnumber": 24,
        "strategy": "Discover your formulas and abandon them"
    },
    {
        "id": 391,
        "edition": 4,
        "cardnumber": 25,
        "strategy": "Display your talent"
    },
    {
        "id": 392,
        "edition": 4,
        "cardnumber": 26,
        "strategy": "Distort time"
    },
    {
        "id": 393,
        "edition": 4,
        "cardnumber": 27,
        "strategy": "Do nothing for as long as possible"
    },
    {
        "id": 394,
        "edition": 4,
        "cardnumber": 28,
        "strategy": "Don't avoid what is easy"
    },
    {
        "id": 395,
        "edition": 4,
        "cardnumber": 29,
        "strategy": "Don't break the silence"
    },
    {
        "id": 396,
        "edition": 4,
        "cardnumber": 30,
        "strategy": "Don't stress one thing more than another"
    },
    {
        "id": 397,
        "edition": 4,
        "cardnumber": 31,
        "strategy": "Do something boring"
    },
    {
        "id": 398,
        "edition": 4,
        "cardnumber": 32,
        "strategy": "Do something sudden, destructive and unpredictable"
    },
    {
        "id": 399,
        "edition": 4,
        "cardnumber": 33,
        "strategy": "Do the last thing first"
    },
    {
        "id": 400,
        "edition": 4,
        "cardnumber": 34,
        "strategy": "Do the words need changing?"
    },
    {
        "id": 401,
        "edition": 4,
        "cardnumber": 35,
        "strategy": "Emphasize differences"
    },
    {
        "id": 402,
        "edition": 4,
        "cardnumber": 36,
        "strategy": "Emphasize the flaws"
    },
    {
        "id": 403,
        "edition": 4,
        "cardnumber": 37,
        "strategy": "Faced with a choice, do both (from Dieter Rot)"
    },
    {
        "id": 404,
        "edition": 4,
        "cardnumber": 38,
        "strategy": "Find a safe part and use it as an anchor"
    },
    {
        "id": 405,
        "edition": 4,
        "cardnumber": 39,
        "strategy": "Give the game away"
    },
    {
        "id": 406,
        "edition": 4,
        "cardnumber": 40,
        "strategy": "Give way to your worst impulse"
    },
    {
        "id": 407,
        "edition": 4,
        "cardnumber": 41,
        "strategy": "Go outside. Shut the door."
    },
    {
        "id": 408,
        "edition": 4,
        "cardnumber": 42,
        "strategy": "Go to an extreme, come part way back"
    },
    {
        "id": 409,
        "edition": 4,
        "cardnumber": 43,
        "strategy": "How would someone else do it?"
    },
    {
        "id": 410,
        "edition": 4,
        "cardnumber": 44,
        "strategy": "How would you have done it?"
    },
    {
        "id": 411,
        "edition": 4,
        "cardnumber": 45,
        "strategy": "In total darkness, or in a very large room, very quietly"
    },
    {
        "id": 412,
        "edition": 4,
        "cardnumber": 46,
        "strategy": "Is it finished?"
    },
    {
        "id": 413,
        "edition": 4,
        "cardnumber": 47,
        "strategy": "Is something missing?"
    },
    {
        "id": 414,
        "edition": 4,
        "cardnumber": 48,
        "strategy": "Is the style right?"
    },
    {
        "id": 415,
        "edition": 4,
        "cardnumber": 49,
        "strategy": "It is simply a matter or work"
    },
    {
        "id": 416,
        "edition": 4,
        "cardnumber": 50,
        "strategy": "Just carry on"
    },
    {
        "id": 417,
        "edition": 4,
        "cardnumber": 51,
        "strategy": "Listen to the quiet voice"
    },
    {
        "id": 418,
        "edition": 4,
        "cardnumber": 52,
        "strategy": "Look at the order in which you do things"
    },
    {
        "id": 419,
        "edition": 4,
        "cardnumber": 53,
        "strategy": "Magnify the most difficult details"
    },
    {
        "id": 420,
        "edition": 4,
        "cardnumber": 54,
        "strategy": "Make it more sensual"
    },
    {
        "id": 421,
        "edition": 4,
        "cardnumber": 55,
        "strategy": "Make what's perfect more human"
    },
    {
        "id": 422,
        "edition": 4,
        "cardnumber": 56,
        "strategy": "Move towards the unimportant"
    },
    {
        "id": 423,
        "edition": 4,
        "cardnumber": 57,
        "strategy": "Not building a wall; making a brick"
    },
    {
        "id": 424,
        "edition": 4,
        "cardnumber": 58,
        "strategy": "Once the search has begun, something will be found"
    },
    {
        "id": 425,
        "edition": 4,
        "cardnumber": 59,
        "strategy": "Only a part, not the whole"
    },
    {
        "id": 426,
        "edition": 4,
        "cardnumber": 60,
        "strategy": "Only one element of each kind"
    },
    {
        "id": 427,
        "edition": 4,
        "cardnumber": 61,
        "strategy": "Openly resist change"
    },
    {
        "id": 428,
        "edition": 4,
        "cardnumber": 62,
        "strategy": "Pae White's non-blank graphic metacard"
    },
    {
        "id": 429,
        "edition": 4,
        "cardnumber": 63,
        "strategy": "Question the heroic"
    },
    {
        "id": 430,
        "edition": 4,
        "cardnumber": 64,
        "strategy": "Remember quiet evenings"
    },
    {
        "id": 431,
        "edition": 4,
        "cardnumber": 65,
        "strategy": "Remove a restriction"
    },
    {
        "id": 432,
        "edition": 4,
        "cardnumber": 66,
        "strategy": "Repetition is a form of change"
    },
    {
        "id": 433,
        "edition": 4,
        "cardnumber": 67,
        "strategy": "Retrace your steps"
    },
    {
        "id": 434,
        "edition": 4,
        "cardnumber": 68,
        "strategy": "Reverse"
    },
    {
        "id": 435,
        "edition": 4,
        "cardnumber": 69,
        "strategy": "Simple Subtraction"
    },
    {
        "id": 436,
        "edition": 4,
        "cardnumber": 70,
        "strategy": "Slow preparation, fast execution"
    },
    {
        "id": 437,
        "edition": 4,
        "cardnumber": 71,
        "strategy": "State the problem as clearly as possible"
    },
    {
        "id": 438,
        "edition": 4,
        "cardnumber": 72,
        "strategy": "Take a break"
    },
    {
        "id": 439,
        "edition": 4,
        "cardnumber": 73,
        "strategy": "Take away the important parts"
    },
    {
        "id": 440,
        "edition": 4,
        "cardnumber": 74,
        "strategy": "The inconsistency principle"
    },
    {
        "id": 441,
        "edition": 4,
        "cardnumber": 75,
        "strategy": "The most easily forgotten thing is the most important"
    },
    {
        "id": 442,
        "edition": 4,
        "cardnumber": 76,
        "strategy": "Think - inside the work -outside the work"
    },
    {
        "id": 443,
        "edition": 4,
        "cardnumber": 77,
        "strategy": "Tidy up"
    },
    {
        "id": 444,
        "edition": 4,
        "cardnumber": 78,
        "strategy": "Try faking it (from Stewart Brand)"
    },
    {
        "id": 445,
        "edition": 4,
        "cardnumber": 79,
        "strategy": "Turn it upside down"
    },
    {
        "id": 446,
        "edition": 4,
        "cardnumber": 80,
        "strategy": "Use an old idea"
    },
    {
        "id": 447,
        "edition": 4,
        "cardnumber": 81,
        "strategy": "Use cliches"
    },
    {
        "id": 448,
        "edition": 4,
        "cardnumber": 82,
        "strategy": "Use filters"
    },
    {
        "id": 449,
        "edition": 4,
        "cardnumber": 83,
        "strategy": "Use something nearby as a model"
    },
    {
        "id": 450,
        "edition": 4,
        "cardnumber": 84,
        "strategy": "Use 'unqualified' people"
    },
    {
        "id": 451,
        "edition": 4,
        "cardnumber": 85,
        "strategy": "Use your own ideas"
    },
    {
        "id": 452,
        "edition": 4,
        "cardnumber": 86,
        "strategy": "Voice your suspicions"
    },
    {
        "id": 453,
        "edition": 4,
        "cardnumber": 87,
        "strategy": "Water"
    },
    {
        "id": 454,
        "edition": 4,
        "cardnumber": 88,
        "strategy": "What context would look right?"
    },
    {
        "id": 455,
        "edition": 4,
        "cardnumber": 89,
        "strategy": "What is the simplest solution?"
    },
    {
        "id": 456,
        "edition": 4,
        "cardnumber": 90,
        "strategy": "What mistakes did you make last time?"
    },
    {
        "id": 457,
        "edition": 4,
        "cardnumber": 91,
        "strategy": "What to increase? What to reduce? What to maintain?"
    },
    {
        "id": 458,
        "edition": 4,
        "cardnumber": 92,
        "strategy": "What were you really thinking about just now?"
    },
    {
        "id": 459,
        "edition": 4,
        "cardnumber": 93,
        "strategy": "What wouldn't you do?"
    },
    {
        "id": 460,
        "edition": 4,
        "cardnumber": 94,
        "strategy": "What would your closest friend do?"
    },
    {
        "id": 461,
        "edition": 4,
        "cardnumber": 95,
        "strategy": "When is it for?"
    },
    {
        "id": 462,
        "edition": 4,
        "cardnumber": 96,
        "strategy": "Where is the edge?"
    },
    {
        "id": 463,
        "edition": 4,
        "cardnumber": 97,
        "strategy": "Which parts can be grouped?"
    },
    {
        "id": 464,
        "edition": 4,
        "cardnumber": 98,
        "strategy": "Work at a different speed"
    },
    {
        "id": 465,
        "edition": 4,
        "cardnumber": 99,
        "strategy": "Would anyone want it?"
    },
    {
        "id": 466,
        "edition": 4,
        "cardnumber": 100,
        "strategy": "Your mistake was a hidden intention"
    }
]
},{}],6:[function(require,module,exports){
module.exports.portfolio = 
[
    {
        "image": "./img/synthULX-main.png",
        "title": "SynthULX",
        "subtitle": "Front End Capstone at Nashville Software School",
        "brief": "abbr. Synthesizer + User Learning Experience; SynthULX is a web application synthesizer utilizing the synthesis capabilities of the <strong>Web Audio API</strong> & the web audio framework <strong>Tone.Js</strong>. The application implements integrative learning techniques by providing a step-by-step tutorial, guiding users with input responsive diagrams (built with <strong>HTML5 Canvas</strong>) and dynamic content to user interactions with each major component found on modern synthesizers. Registered users can save, load, edit, & delete patches of synth parameters to their account; full <strong>CRUD</strong> methodology with <strong>Firebase</strong> authentication.",
        "link": "https://synthulx.firebaseapp.com",
        "repo": "https://github.com/iiimosley/synthULX"
    },
    {
        "image": "./img/goodreads.png",
        "title": "GoodQuotes",
        "brief": "RESTful API returning JSON data of quotes by querying persons-of-note, publications, or tags. Data constructed from web scraping GoodReads for user-submitted quotes (via Cheerio.Js). Client constructed with Vue.Js",
        "link": "https://goodquotes.herokuapp.com",
        "repo": "https://github.com/iiimosley/WebAudioSandBox"
    },
    {
        "image": "./img/webaudiosandbox.png",
        "title": "WebAudio SandBox",
        "brief": "Web application constructed for my presentation, <strong>Javascript Synthesis: Web Audio API &amp; Tones.Js</strong> at the <strong><a href='https://www.meetup.com/Nashville-Music-Programmers/' target='_blank'>Nashville Music Programmers</a></strong> meet-up. The application was built to give example to the AudioNode structure and routing paradigm in the Web Audio API. The application logs each AudioNode for group examination of components and demostrates the responsive changes in values to the AudioNode components. Open the WebAudio console in Firefox to view the routing paradigm.",
        "repo": "https://github.com/iiimosley/WebAudioSandBox"
    },
    {
        "image": "./img/static-web.png",
        "title": "Static Web Challenges",
        "brief": "A culmination of challenges given at Nashville Software School (~1mo into the program). Keep the console open to see results. Challenges include:<ul><li>Happy Numbers</li><li>Fibonacci Generator</li><li>CSS Shapes + Animation</li><li>Synced Input Values</li></ul>",
        "repo": "https://github.com/iiimosley/NSS-SW-Challenges"
    },
    {
        "image": "./img/sandwich-maker.png",
        "title": "Stack it Up!",
        "subtitle": "Sandwich Builder Application",
        "brief": "This application compiles all checked ingredients and returns a sum based on the quantity of each ingredient selected. Responsive checkboxes on 'None' remove any checkmarks on ingredients &amp; vice versa.",
        "repo": "https://github.com/iiimosley/NSS-SPA-Sandwich-Maker"
    }
]
},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":8,"./handlebars/exception":11,"./handlebars/no-conflict":21,"./handlebars/runtime":22,"./handlebars/safe-string":23,"./handlebars/utils":24}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.5.3';
exports.VERSION = VERSION;
var COMPILER_REVISION = 8;
exports.COMPILER_REVISION = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;

exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0 <4.3.0',
  8: '>= 4.3.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":9,"./exception":11,"./helpers":12,"./logger":20,"./utils":24}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":10}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":24}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      endLineNumber = undefined,
      column = undefined,
      endColumn = undefined;

  if (loc) {
    line = loc.start.line;
    endLineNumber = loc.end.line;
    column = loc.start.column;
    endColumn = loc.end.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;
      this.endLineNumber = endLineNumber;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
        Object.defineProperty(this, 'endColumn', {
          value: endColumn,
          enumerable: true
        });
      } else {
        this.column = column;
        this.endColumn = endColumn;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
exports.moveHelperToHooks = moveHelperToHooks;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];
    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}


},{"./helpers/block-helper-missing":13,"./helpers/each":14,"./helpers/helper-missing":15,"./helpers/if":16,"./helpers/log":17,"./helpers/lookup":18,"./helpers/with":19}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":24}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else if (global.Symbol && context[global.Symbol.iterator]) {
        var newContext = [];
        var iterator = context[global.Symbol.iterator]();
        for (var it = iterator.next(); !it.done; it = iterator.next()) {
          newContext.push(it.value);
        }
        context = newContext;
        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        (function () {
          var priorKey = undefined;

          Object.keys(context).forEach(function (key) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          });
          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1, true);
          }
        })();
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../exception":11,"../utils":24}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":11}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#if requires exactly one argument');
    }
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#unless requires exactly one argument');
    }
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../exception":11,"../utils":24}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var dangerousPropertyRegex = /^(constructor|__defineGetter__|__defineSetter__|__lookupGetter__|__proto__)$/;

exports.dangerousPropertyRegex = dangerousPropertyRegex;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    if (!obj) {
      return obj;
    }
    if (dangerousPropertyRegex.test(String(field)) && !Object.prototype.propertyIsEnumerable.call(obj, field)) {
      return undefined;
    }
    return obj[field];
  });
};


},{}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#with requires exactly one argument');
    }
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../exception":11,"../utils":24}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":24}],21:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

var _helpers = require('./helpers');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
    return;
  }

  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
  } else {
    // Use the embedded version info since the runtime doesn't know about this revision yet
    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
  }
}

function template(templateSpec, env) {

  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as pseudo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }
    partial = env.VM.resolvePartial.call(this, partial, context, options);

    var optionsWithHooks = Utils.extend({}, options, { hooks: this.hooks });

    var result = env.VM.invokePartial.call(this, partial, context, optionsWithHooks);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, optionsWithHooks);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name, loc) {
      if (!obj || !(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj, { loc: loc });
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = Utils.extend({}, env.helpers, options.helpers);

      if (templateSpec.usePartial) {
        container.partials = Utils.extend({}, env.partials, options.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = Utils.extend({}, env.decorators, options.decorators);
      }

      container.hooks = {};

      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
      container.hooks = options.hooks;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

/**
 * This is currently part of the official API, therefore implementation details should not be changed.
 */

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":8,"./exception":11,"./helpers":12,"./utils":24}],23:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;

var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],25:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":7}],26:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],27:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"aboutContainer\">\n    <div id=\"aboutFloat\">\n        <aside class=\"education\" id=\"eduLeft\">\n            <h3>Education</h3>\n            <div class=\"school\">\n                <h4>Nashville Software School</h4>\n                <section class=\"schoolDetail\">\n                    <p>\n                        <span class=\"study\">Cohort 23:</span>\n                        <span>November 2017 - May 2018</span>\n                    </p>\n                    <p>\n                        <span class=\"study\">Concentration:</span>\n                        <span>Javascript Fullstack Development</span>\n                    </p>\n                </section>\n            </div>\n            <div class=\"school\">\n                <h4>Middle Tennessee State University</h4>\n                <section class=\"schoolDetail\">\n                    <p>Class of Spring 2012</p>\n                    <p>\n                        <span class=\"study\">Concentration:</span> <span>Audio Engineering</span></p>\n                </section>\n            </div>\n        </aside>\n        <div id=\"aboutPhoto\"><img src=\"./img/tm_photo.jpg\"/></div>\n        <div class=\"aboutBody\">\n            <h2>About</h2>\n            <p><i><strong>Software Developer from Nashville, TN,</strong></i> where I began studying &amp; implementing full stack software development concentrating\n                on Node and full stack Javascript development.</p>\n            <p>The avidity I hold for software was incited early on with digital audio and web design. I would tinker\n            away late into the evenings of my high school years both creating/editing/mixing audio and styling web pages, where I began learning entry concepts to HTML/CSS/Javascript. I\n            was hooked on the feeling of accomplishment from learning, creating, and meeting goals I set through the technology utilized.</p>\n            <p>While studying audio engineering at MTSU, I took on a lab assistant position for the Digital Audio Production studios on campus. There, I became fully immersed in the study and practice of technology. I enjoyed working with my peers, helping configure and utilize production software/hardware, deliberating an approach of execution, and creating complex designs and structures all in the process. I looked forward to everyday and knew that I was taking steps towards a fulfilling career.</p>\n            <p>After completing my studies and pursuing musical aspirations, I found myself desiring a career to extend my skills and mindset to more universal solutions. I wanted to continue on the path where initiative, ingenuity, and discernment for structure would carve the way for a career. With the guidance of close peers active in the development community, I began honing the craft of software development.</p>\n        </div>\n    </div>\n    <div id=\"aboutWhy\">\n        <h4 id=\"why\">I have chosen to pursue a career in software development:</h4>\n        <ul>\n            <li>To synthesize with the tools given as the means for a solution</li>\n            <li>To grow in a field focused on solving applicable problems</li>\n            <li>To be engaged in a community that values innovation</li>\n            <li>To contribute to society by bettering\n            intercommunication for all through technology</li>\n        </ul>\n    </div>\n    <div id=\"aboutTech\">\n    <h2>Technologies Acquired</h2>\n    <h3>Client Side Development</h3>\n    <div class=\"iconFlex\">\n        <svg viewBox=\"0 0 128 128\">\n            <title>Javascript</title>\n            <path fill=\"#F0DB4F\" d=\"M2 1v125h125v-125h-125zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065-.001-10.115.046-20.188.046-30.188h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z\"></path>\n        </svg>\n        <svg viewBox=\"0 0 128 128\">\n            <title>jQuery</title>\n            <path fill=\"#0868AC\" d=\"M47.961 79.02l.193.094.344.166c.439.209.882.416 1.329.615l.281.125c.513.225 1.029.439 1.551.645l.378.148c.482.188.972.37 1.463.543l.184.063c.539.188 1.083.363 1.632.534l.395.117c.558.169 1.109.37 1.685.477 36.554 6.665 47.171-21.967 47.171-21.967-8.918 11.618-24.747 14.683-39.745 11.271-.568-.128-1.12-.306-1.674-.47l-.417-.126c-.541-.166-1.079-.341-1.612-.524l-.221-.08c-.478-.168-.951-.346-1.421-.527l-.398-.156c-.516-.203-1.028-.416-1.534-.638l-.307-.136c-.435-.197-.866-.396-1.294-.602l-.375-.18c-.336-.164-.669-.339-1.001-.51l-.668-.35c-.405-.217-.803-.442-1.199-.673l-.405-.226c-.527-.311-1.048-.632-1.563-.958l-.421-.28c-.374-.241-.746-.486-1.112-.739l-.358-.252c-.354-.25-.704-.503-1.051-.76l-.466-.353c-.318-.243-.635-.488-.948-.74l-.423-.34c-.398-.328-.792-.657-1.182-.995l-.129-.109c-.423-.368-.836-.747-1.244-1.127l-.35-.337c-.303-.287-.6-.577-.893-.874l-.35-.35c-.372-.381-.737-.767-1.095-1.158l-.054-.058c-.379-.414-.749-.837-1.111-1.264l-.291-.346c-.27-.325-.538-.655-.799-.988l-.293-.364c-.315-.408-.622-.815-.923-1.229-8.326-11.358-11.318-27.023-4.663-39.888l-5.899 7.482c-7.559 10.863-6.617 24.997-.844 36.541l.423.821.271.52.168.299.301.539c.179.316.362.63.55.944l.315.519c.208.336.421.668.64 1l.272.422c.301.448.609.896.926 1.336l.027.035.156.211c.275.379.558.753.844 1.123l.318.404c.255.321.516.641.78.959l.298.355c.355.419.717.835 1.087 1.242l.022.023.042.046c.36.394.73.778 1.104 1.164l.354.357c.29.292.584.579.882.865l.361.343c.397.374.798.741 1.208 1.101l.02.015.21.18c.361.312.729.623 1.099.928l.455.362c.302.242.608.481.916.716l.489.372c.34.25.682.496 1.027.737l.375.266.103.073c.328.226.663.442.998.659l.432.288c.513.325 1.035.646 1.562.956l.432.244c.388.223.777.442 1.172.656l.648.336.84.437zM51.654 42.225c.819 1.174 1.726 2.57 2.813 3.514.394.434.806.856 1.226 1.273l.324.318c.409.396.824.785 1.252 1.164l.052.044.012.013c.475.416.965.816 1.463 1.21l.333.26c.5.383 1.009.759 1.531 1.118l.045.033.698.46.332.22c.373.238.75.472 1.135.694l.16.093c.331.191.667.379 1.003.561l.356.187.702.363.106.048c.482.237.968.465 1.464.682l.323.133c.396.168.797.333 1.199.487l.514.188c.366.136.732.26 1.102.383l.499.16c.526.163 1.045.369 1.593.46 28.222 4.677 34.738-17.054 34.738-17.054-5.874 8.459-17.248 12.494-29.386 9.344-.539-.142-1.071-.295-1.598-.462l-.481-.155c-.375-.121-.748-.25-1.118-.385l-.504-.188c-.405-.156-.807-.317-1.204-.485l-.324-.138c-.498-.217-.989-.445-1.472-.685l-.739-.376-.426-.219c-.314-.17-.626-.348-.934-.527l-.223-.127c-.383-.223-.759-.453-1.132-.689l-.341-.229-.732-.484c-.521-.359-1.027-.734-1.525-1.115l-.343-.271c-5.313-4.193-9.524-9.927-11.527-16.428-2.098-6.74-1.646-14.308 1.989-20.449l-4.466 6.306c-5.466 7.865-5.169 18.396-.905 26.715.714 1.393 1.517 2.747 2.416 4.035zM81.401 32.494l.701.243.309.098c.333.104.662.226 1.005.29 15.583 3.011 19.811-7.997 20.936-9.617-3.703 5.331-9.925 6.61-17.56 4.757-.603-.146-1.266-.363-1.848-.57-.745-.266-1.479-.568-2.193-.91-1.356-.652-2.648-1.441-3.846-2.347-6.832-5.185-11.076-15.072-6.618-23.126l-2.412 3.324c-3.222 4.743-3.539 10.633-1.303 15.869 2.358 5.56 7.19 9.92 12.829 11.989zM66.359 96.295h-4.226c-.234 0-.467.188-.517.417l-1.5 6.94-1.5 6.94c-.049.229-.282.417-.516.417h-2.991c-2.959 0-2.617-2.047-2.011-4.851l.018-.085.066-.354.012-.066.135-.72.145-.771.154-.785.682-3.332.683-3.332c.047-.23-.107-.419-.341-.419h-4.337c-.234 0-.466.188-.514.418l-.933 4.424-.932 4.425-.002.006-.086.412c-1.074 4.903-.79 9.58 5.048 9.727l.17.003h9.163c.234 0 .467-.188.516-.417l1.976-9.289 1.976-9.29c.049-.23-.103-.417-.338-.418zM21.103 96.246h-4.64c-.235 0-.469.188-.521.416l-.44 1.942-.44 1.942c-.051.229.098.416.333.416h4.676c.235 0 .468-.188.518-.417l.425-1.941.425-1.941c.049-.229-.101-.417-.336-.417zM19.757 102.29h-4.677c-.234 0-.469.188-.521.416l-.657 2.91-.656 2.909-.183.834-.631 2.97-.63 2.971c-.049.229-.15.599-.225.821 0 0-.874 2.6-2.343 2.57l-.184-.004-1.271-.023h-.001c-.234-.003-.469.18-.524.407l-.485 2.039-.484 2.038c-.055.228.093.416.326.42.833.01 2.699.031 3.828.031 3.669 0 5.604-2.033 6.843-7.883l1.451-6.714 1.361-6.297c.049-.227-.103-.415-.337-.415zM105.874 100.716l-.194-.801-.191-.82-.097-.414c-.38-1.477-1.495-2.328-3.917-2.328l-3.77-.004-3.472-.005h-3.907c-.234 0-.466.188-.515.417l-.173.816-.204.964-.057.271-1.759 8.24-1.67 7.822c-.05.23-.066.512-.038.626.028.115.479.209.713.209h3.524c.235 0 .532-.042.66-.094s.317-.513.364-.742l.626-3.099.627-3.1.001-.005.084-.413.76-3.56.671-3.144c.05-.229.281-.416.515-.417l11.089-.005c.235.002.383-.185.33-.414zM120.149 93.476l-.854.003h-3.549c-.235 0-.536.159-.667.353l-7.849 11.498c-.132.194-.283.166-.335-.062l-.578-2.533c-.052-.229-.287-.416-.522-.416h-5.045c-.235 0-.374.184-.31.409l2.261 7.921c.064.226.069.596.011.824l-.985 3.833c-.059.228.085.413.32.413h4.987c.234 0 .474-.186.532-.413l.986-3.833c.058-.229.221-.567.363-.755l12.742-16.911c.142-.188.065-.341-.169-.339l-1.339.008zM80.063 103.395v-.004c-.029.254-.264.441-.499.441h-6.397c-.222 0-.334-.15-.301-.336l.006-.015-.004.002.003-.021.029-.109c.611-1.624 1.855-2.69 4.194-2.69 2.634-.001 3.148 1.285 2.969 2.732zm-1.877-7.384c-8.211 0-10.157 4.984-11.249 10.015-1.091 5.128-.998 9.921 7.5 9.921h1.03l.256-.001h.06l1.02-.003h.018c2.244-.009 4.495-.026 5.406-.033.233-.004.461-.191.509-.42l.344-1.681.067-.327.41-2.006c.047-.229-.106-.418-.341-.418h-7.639c-3.039 0-3.941-.807-3.608-3.181h12.211l-.001.001.008-.001c.194-.003.374-.137.445-.315l.029-.106-.001.001c1.813-6.839 1.293-11.445-6.474-11.446zM39.376 103.369l-.116.409v.001l-.922 3.268-.922 3.267c-.063.227-.308.411-.543.411h-4.88c-3.702 0-4.604-2.896-3.702-7.166.901-4.368 2.668-7.083 6.312-7.358 4.98-.376 5.976 3.126 4.773 7.168zm3.348 7.105s2.301-5.588 2.823-8.814c.713-4.319-1.45-10.585-9.804-10.585-8.306 0-11.914 5.981-13.29 12.484-1.376 6.55.427 12.293 8.686 12.246l6.516-.024 6.089-.022c.234-.002.474-.188.534-.414l1.061-4.046c.059-.228-.084-.414-.319-.416l-1.017-.006-1.017-.006c-.199-.001-.313-.131-.289-.302l.027-.095zM83.844 106.733c0 .155-.125.281-.28.281-.154 0-.28-.126-.28-.281 0-.154.125-.279.28-.279.155 0 .28.125.28.279z\"></path>\n        </svg>\n        <img src=\"./img/vue.png\" title=\"Vue\"/>\n        <svg viewBox=\"0 0 128 128\">\n            <title>AngularJS</title>\n            <path fill=\"#B3B3B3\" d=\"M63.81 1.026l-59.257 20.854 9.363 77.637 49.957 27.457 50.214-27.828 9.36-77.635z\"></path>\n            <path fill=\"#A6120D\" d=\"M117.536 25.998l-53.864-18.369v112.785l45.141-24.983z\"></path>\n            <path fill=\"#DD1B16\" d=\"M11.201 26.329l8.026 69.434 44.444 24.651v-112.787z\"></path>\n            <path fill=\"#F2F2F2\" d=\"M78.499 67.67l-14.827 6.934h-15.628l-7.347 18.374-13.663.254 36.638-81.508 14.827 55.946zm-1.434-3.491l-13.295-26.321-10.906 25.868h10.807l13.394.453z\"></path>\n            <path fill=\"#B3B3B3\" d=\"M63.671 11.724l.098 26.134 12.375 25.888h-12.446l-.027 10.841 17.209.017 8.042 18.63 13.074.242z\"></path>\n        </svg>\n        <svg viewBox=\"0 0 128 128\">\n            <title>CSS</title>\n            <path fill=\"#1572B6\" d=\"M18.814 114.123l-10.054-112.771h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z\"></path>\n            <path fill=\"#33A9DC\" d=\"M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z\"></path>\n            <path fill=\"#fff\" d=\"M64.001 51.429h18.302l1.264-14.163h-19.566v-13.831h34.681999999999995l-.332 3.711-3.4 38.114h-30.95v-13.831z\"></path>\n            <path fill=\"#EBEBEB\" d=\"M64.083 87.349l-.061.018-15.403-4.159-.985-11.031h-13.882l1.937 21.717 28.331 7.863.063-.018v-14.39z\"></path>\n            <path fill=\"#fff\" d=\"M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881h-13.876z\"></path>\n            <path fill=\"#EBEBEB\" d=\"M64.048 23.435v13.831000000000001h-33.407999999999994l-.277-3.108-.63-7.012-.331-3.711h34.646zM64.001 51.431v13.831000000000001h-15.209l-.277-3.108-.631-7.012-.33-3.711h16.447z\"></path>\n        </svg>\n        <svg viewBox=\"0 0 128 128\">\n            <title>Sass</title>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#CB6699\" d=\"M1.219 56.156c0 .703.207 1.167.323 1.618.756 2.933 2.381 5.45 4.309 7.746 2.746 3.272 6.109 5.906 9.554 8.383 2.988 2.148 6.037 4.248 9.037 6.38.515.366 1.002.787 1.561 1.236-.481.26-.881.489-1.297.7-3.959 2.008-7.768 4.259-11.279 6.986-2.116 1.644-4.162 3.391-5.607 5.674-2.325 3.672-3.148 7.584-1.415 11.761.506 1.22 1.278 2.274 2.367 3.053.353.252.749.502 1.162.6 1.058.249 2.136.412 3.207.609l3.033-.002c3.354-.299 6.407-1.448 9.166-3.352 4.312-2.976 7.217-6.966 8.466-12.087.908-3.722.945-7.448-.125-11.153-.099-.344-.224-.681-.354-1.014-.13-.333-.283-.657-.463-1.072l6.876-3.954.103.088c-.125.409-.258.817-.371 1.23-.817 2.984-1.36 6.02-1.165 9.117.208 3.3 1.129 6.389 3.061 9.146 1.562 2.23 5.284 2.313 6.944.075.589-.795 1.16-1.626 1.589-2.513 1.121-2.315 2.159-4.671 3.23-7.011l.187-.428c-.077 1.108-.167 2.081-.208 3.055-.064 1.521.025 3.033.545 4.48.445 1.238 1.202 2.163 2.62 2.326.97.111 1.743-.333 2.456-.896 1.114-.879 2.019-1.965 2.691-3.199 1.901-3.491 3.853-6.961 5.576-10.54 1.864-3.871 3.494-7.855 5.225-11.792l.286-.698c.409 1.607.694 3.181 1.219 4.671.61 1.729 1.365 3.417 2.187 5.058.389.775.344 1.278-.195 1.928-2.256 2.72-4.473 5.473-6.692 8.223-.491.607-.98 1.225-1.389 1.888-.247.403-.411.894-.48 1.364-.133.898.422 1.764 1.383 1.971.878.189 1.813.259 2.708.193 3.097-.228 5.909-1.315 8.395-3.157 3.221-2.386 4.255-5.642 3.475-9.501-.211-1.047-.584-2.065-.947-3.074-.163-.455-.174-.774.123-1.198 2.575-3.677 4.775-7.578 6.821-11.569.081-.157.164-.314.306-.482.663 3.45 1.661 6.775 3.449 9.792-.912.879-1.815 1.676-2.632 2.554-1.799 1.934-3.359 4.034-4.173 6.595-.35 1.104-.619 2.226-.463 3.405.242 1.831 1.742 3.021 3.543 2.604 3.854-.892 7.181-2.708 9.612-5.925 1.636-2.166 1.785-4.582 1.1-7.113-.188-.688-.411-1.365-.651-2.154.951-.295 1.878-.649 2.837-.868 4.979-1.136 9.904-.938 14.702.86 2.801 1.05 5.064 2.807 6.406 5.571 1.639 3.379.733 6.585-2.452 8.721-.297.199-.637.356-.883.605-.151.153-.242.459-.205.67.021.123.346.277.533.275 1.047-.008 1.896-.557 2.711-1.121 2.042-1.413 3.532-3.314 3.853-5.817l.063-.188-.077-1.63c-.031-.094.023-.187.016-.258-.434-3.645-2.381-6.472-5.213-8.688-3.28-2.565-7.153-3.621-11.249-3.788-3.338-.136-6.619.36-9.765 1.503-.897.325-1.786.71-2.688 1.073-.121-.219-.251-.429-.358-.646-.926-1.896-2.048-3.708-2.296-5.882-.176-1.544-.392-3.086-.025-4.613.353-1.469.813-2.913 1.246-4.362.223-.746.066-1.164-.646-1.5-.248-.117-.518-.219-.786-.258-1.75-.254-3.476-.109-5.171.384-.6.175-1.036.511-1.169 1.175-.076.381-.231.746-.339 1.122-.443 1.563-.757 3.156-1.473 4.645-1.794 3.735-3.842 7.329-5.938 10.897-.227.385-.466.763-.752 1.23-.736-1.54-1.521-2.922-1.759-4.542-.269-1.832-.481-3.661-.025-5.479.339-1.356.782-2.687 1.19-4.025.193-.636.104-.97-.472-1.305-.291-.169-.62-.319-.948-.368-1.815-.269-3.603-.128-5.354.438-.543.176-.828.527-.994 1.087-.488 1.652-.904 3.344-1.589 4.915-2.774 6.36-5.628 12.687-8.479 19.013-.595 1.321-1.292 2.596-1.963 3.882-.17.326-.418.613-.63.919-.17-.201-.236-.339-.235-.477.005-.813-.092-1.65.063-2.436.469-2.378 1.009-4.743 1.578-7.099.47-1.946 1.017-3.874 1.538-5.807.175-.647.178-1.252-.287-1.796-.781-.911-2.413-1.111-3.381-.409l-.428.242.083-.69c.204-1.479.245-2.953-.161-4.41-.506-1.816-1.802-2.861-3.686-2.803-.878.027-1.8.177-2.613.497-3.419 1.34-6.048 3.713-8.286 6.568-.203.259-.471.495-.757.654-2.893 1.604-5.795 3.188-8.696 4.778l-3.229 1.769c-.866-.826-1.653-1.683-2.546-2.41-2.727-2.224-5.498-4.393-8.244-6.592-2.434-1.949-4.792-3.979-6.596-6.56-1.342-1.92-2.207-4.021-2.29-6.395-.105-3.025.753-5.789 2.293-8.362 1.97-3.292 4.657-5.934 7.611-8.327 3.125-2.53 6.505-4.678 10.008-6.639 4.901-2.743 9.942-5.171 15.347-6.774 5.542-1.644 11.165-2.585 16.965-1.929 2.28.258 4.494.78 6.527 1.895 1.557.853 2.834 1.97 3.428 3.716.586 1.718.568 3.459.162 5.204-.825 3.534-2.76 6.447-5.195 9.05-3.994 4.267-8.866 7.172-14.351 9.091-3.165 1.107-6.421 1.802-9.765 2.083-2.729.229-5.401-.013-7.985-.962-1.711-.629-3.201-1.591-4.399-2.987-.214-.25-.488-.521-.887-.287-.391.23-.46.602-.329.979.219.626.421 1.278.762 1.838.857 1.405 2.107 2.424 3.483 3.298 2.643 1.681 5.597 2.246 8.66 2.377 4.648.201 9.183-.493 13.654-1.74 6.383-1.78 11.933-4.924 16.384-9.884 3.706-4.13 6.353-8.791 6.92-14.419.277-2.747-.018-5.438-1.304-7.944-1.395-2.715-3.613-4.734-6.265-6.125-3.862-2.025-8.03-3.204-12.332-3.204h-4.31c-5.21 0-10.247 1.493-15.143 3.274-3.706 1.349-7.34 2.941-10.868 4.703-7.683 3.839-14.838 8.468-20.715 14.833-2.928 3.171-5.407 6.67-6.833 10.79-.417 1.206-.813 2.499-1.111 3.746m27.839 36.013c-.333 4.459-2.354 8.074-5.657 11.002-1.858 1.646-3.989 2.818-6.471 3.23-.9.149-1.821.185-2.694-.188-1.245-.532-1.524-1.637-1.548-2.814-.037-1.876.62-3.572 1.521-5.186 1.176-2.104 2.9-3.708 4.741-5.206 2.9-2.361 6.046-4.359 9.268-6.245l.243-.1c.498 1.84.735 3.657.597 5.507zm25.158-19.379c-.235 1.424-.529 2.849-.945 4.229-1.438 4.777-3.285 9.406-5.282 13.973-.369.845-.906 1.616-1.373 2.417-.072.124-.179.231-.283.334-.578.571-1.126.541-1.418-.206-.34-.868-.549-1.797-.729-2.716-.121-.617-.092-1.265-.13-1.897.039-4.494 1.41-8.578 3.736-12.38.959-1.568 2.003-3.062 3.598-4.054.49-.305 1.04-.55 1.595-.706.85-.239 1.372.154 1.231 1.006zm17.164 21.868l6.169-7.203c.257 2.675-4.29 8.015-6.169 7.203zm19.703-4.847c-.436.25-.911.43-1.358.661-.409.212-.544-.002-.556-.354-.008-.239.027-.489.093-.721.833-2.938 2.366-5.446 4.647-7.486l.16-.082c1.085 3.035-.169 6.368-2.986 7.982z\"></path>\n        </svg>\n        <svg viewBox=\"0 0 128 128\">\n            <title>Bootstrap</title>\n            <path fill=\"#5B4282\" d=\"M9.531 112.586h4.161c1.896 0 3.273.27 4.129.81.857.54 1.285 1.398 1.285 2.575 0 .799-.188 1.454-.563 1.966s-.874.82-1.496.924v.091c.848.189 1.459.543 1.834 1.061s.563 1.207.563 2.067c0 1.22-.44 2.171-1.322 2.854-.881.683-2.078 1.024-3.59 1.024h-5.001v-13.372zm2.835 5.296h1.646c.768 0 1.325-.119 1.669-.356.345-.238.517-.631.517-1.18 0-.512-.187-.879-.562-1.102s-.968-.334-1.779-.334h-1.491v2.972zm0 2.25v3.485h1.848c.78 0 1.356-.149 1.729-.448s.558-.756.558-1.372c0-1.109-.793-1.665-2.378-1.665h-1.757zM34.252 119.254c0 2.213-.549 3.915-1.646 5.104s-2.67 1.784-4.719 1.784-3.622-.595-4.719-1.784c-1.098-1.189-1.646-2.896-1.646-5.122s.55-3.925 1.651-5.099 2.678-1.761 4.733-1.761 3.626.592 4.715 1.774c1.087 1.183 1.631 2.885 1.631 5.104zm-9.758 0c0 1.494.283 2.619.851 3.375.567.756 1.414 1.134 2.542 1.134 2.262 0 3.393-1.503 3.393-4.509 0-3.012-1.125-4.518-3.375-4.518-1.128 0-1.979.379-2.552 1.139s-.859 1.885-.859 3.379zM49.161 119.254c0 2.213-.549 3.915-1.646 5.104s-2.67 1.784-4.719 1.784-3.622-.595-4.719-1.784c-1.098-1.189-1.646-2.896-1.646-5.122s.55-3.925 1.651-5.099 2.678-1.761 4.733-1.761 3.626.592 4.715 1.774c1.086 1.183 1.631 2.885 1.631 5.104zm-9.759 0c0 1.494.283 2.619.851 3.375.567.756 1.414 1.134 2.542 1.134 2.262 0 3.393-1.503 3.393-4.509 0-3.012-1.125-4.518-3.375-4.518-1.128 0-1.979.379-2.552 1.139s-.859 1.885-.859 3.379zM57.09 125.958h-2.835v-11.012h-3.631v-2.36h10.097v2.36h-3.631v11.012zM70.671 122.245c0 1.208-.434 2.159-1.303 2.854-.869.695-2.078 1.043-3.626 1.043-1.427 0-2.689-.269-3.786-.805v-2.634c.902.402 1.666.686 2.291.851s1.196.247 1.715.247c.622 0 1.099-.119 1.431-.356.333-.238.499-.591.499-1.061 0-.262-.073-.495-.219-.7-.146-.204-.361-.401-.645-.59s-.861-.491-1.733-.905c-.817-.384-1.43-.753-1.838-1.107-.409-.354-.735-.765-.979-1.234-.244-.47-.366-1.019-.366-1.646 0-1.183.401-2.113 1.203-2.79s1.91-1.015 3.325-1.015c.695 0 1.358.082 1.989.247.631.165 1.291.396 1.98.695l-.915 2.204c-.713-.292-1.303-.497-1.77-.613-.467-.116-.925-.174-1.376-.174-.537 0-.948.125-1.235.375-.287.25-.43.576-.43.979 0 .25.058.468.174.654.116.186.3.366.553.54.253.174.852.486 1.797.938 1.25.598 2.107 1.197 2.57 1.797s.694 1.334.694 2.206zM78.254 125.958h-2.835v-11.012h-3.631v-2.36h10.097v2.36h-3.631v11.012zM86.778 120.827v5.131h-2.835v-13.372h3.896c1.817 0 3.161.331 4.033.992.872.662 1.308 1.667 1.308 3.014 0 .787-.216 1.486-.649 2.099s-1.046 1.093-1.838 1.44c2.012 3.006 3.323 4.948 3.933 5.826h-3.146l-3.192-5.131h-1.51zm0-2.305h.915c.896 0 1.558-.149 1.985-.448s.64-.769.64-1.409c0-.634-.218-1.085-.654-1.354-.436-.268-1.111-.402-2.026-.402h-.86v3.613zM104.494 125.958l-.97-3.183h-4.875l-.97 3.183h-3.055l4.719-13.426h3.466l4.738 13.426h-3.053zm-1.647-5.561c-.896-2.884-1.401-4.515-1.514-4.893-.113-.378-.193-.677-.242-.896-.201.78-.777 2.71-1.729 5.789h3.485zM118.469 116.757c0 1.439-.45 2.54-1.349 3.301-.899.763-2.178 1.144-3.837 1.144h-1.216v4.756h-2.835v-13.372h4.271c1.622 0 2.855.349 3.7 1.047.844.699 1.266 1.74 1.266 3.124zm-6.402 2.122h.933c.872 0 1.524-.172 1.957-.517.433-.345.649-.846.649-1.504 0-.665-.182-1.156-.544-1.473-.363-.317-.932-.476-1.706-.476h-1.29v3.97zM73.951 56.759c-1.983-.653-4.838-.759-8.565-.759h-13.386v20h14.424c2.502 0 4.259-.249 5.271-.437 1.783-.318 3.274-.93 4.472-1.676 1.198-.744 2.183-1.869 2.955-3.293.771-1.424 1.158-3.087 1.158-4.951 0-2.184-.559-3.98-1.677-5.59-1.117-1.611-2.668-2.642-4.652-3.294zM71.895 48.147c1.97-.586 3.455-1.646 4.452-3.003.999-1.357 1.498-3.103 1.498-5.154 0-1.943-.466-3.675-1.398-5.154-.932-1.478-2.263-2.481-3.992-3.027-1.732-.544-4.7-.809-8.906-.809h-11.549v18h12.507c3.435 0 5.897-.399 7.388-.853zM117 16.126c0-7.802-6.325-14.126-14.127-14.126h-77.746c-7.802 0-14.127 6.324-14.127 14.126v77.748c0 7.802 6.325 14.126 14.127 14.126h77.746c7.802 0 14.127-6.324 14.127-14.126v-77.748zm-30.43 57.144c-1.157 2.356-2.589 4.173-4.292 5.451-1.704 1.277-3.841 2.446-6.41 3.098-2.569.653-5.717 1.181-9.444 1.181h-22.424v-59h22.065c4.473 0 8.059.62 10.761 1.804 2.703 1.185 4.818 3.021 6.351 5.483 1.53 2.463 2.296 5.046 2.296 7.735 0 2.502-.68 4.861-2.036 7.071-1.358 2.21-3.408 3.995-6.15 5.352 3.54 1.038 6.263 2.811 8.166 5.313 1.903 2.503 2.855 5.458 2.855 8.866-.001 2.742-.579 5.291-1.738 7.646z\"></path>\n        </svg>\n        <img src=\"./img/handlebars.png\" title=\"Handlerbars\"/>\n        <svg viewBox=\"0 0 128 128\">\n            <title>HTML5</title>\n            <path fill=\"#E44D26\" d=\"M19.037 113.876l-10.005-112.215h109.936l-10.016 112.198-45.019 12.48z\"></path>\n            <path fill=\"#F16529\" d=\"M64 116.8l36.378-10.086 8.559-95.878h-44.937z\"></path>\n            <path fill=\"#EBEBEB\" d=\"M64 52.455h-18.212l-1.258-14.094h19.47v-13.762h-34.511l.33 3.692 3.382 37.927h30.799zM64 88.198l-.061.017-15.327-4.14-.979-10.975h-13.817l1.928 21.609 28.193 7.826.063-.017z\"></path>\n            <path fill=\"#fff\" d=\"M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zM63.952 24.599v13.762h33.244l.276-3.092.628-6.978.329-3.692z\"></path>\n        </svg>\n    </div>\n    <h3>Server Side Development</h3>\n    <div class=\"iconFlex\">\n        <img src=\"./img/csharp.png\" title=\"C#\">\n        <img src=\"./img/aspnet.png\" title=\"ASP NET\">\n        <img src=\"./img/node.png\" title=\"Node.js\"/>\n        <img src=\"./img/express.png\" title=\"Express.js\"/>\n        <img src=\"./img/mssql.png\" title=\"Microsoft SQL Server/T-SQL\"/>\n        <svg viewBox=\"0 0 128 128\">\n            <title>PostGreSQL</title>\n            <path d=\"M85.988 76.075c.632-5.262.443-6.034 4.362-5.182l.995.088c3.014.137 6.957-.485 9.272-1.561 4.986-2.313 7.942-6.177 3.026-5.162-11.215 2.313-11.986-1.483-11.986-1.483 11.843-17.571 16.794-39.875 12.521-45.335-11.654-14.892-31.828-7.85-32.166-7.667l-.108.021c-2.216-.461-4.695-.735-7.481-.78-5.075-.083-8.926 1.331-11.847 3.546 0 0-35.989-14.827-34.315 18.646.356 7.121 10.207 53.882 21.956 39.758 4.294-5.164 8.444-9.531 8.444-9.531 2.061 1.369 4.528 2.067 7.116 1.816l.2-.17c-.062.641-.035 1.268.081 2.01-3.027 3.383-2.137 3.977-8.189 5.222-6.122 1.262-2.525 3.508-.178 4.095 2.848.713 9.433 1.722 13.884-4.509l-.177.711c1.188.95 1.107 6.827 1.275 11.026.168 4.199.45 8.117 1.306 10.429.856 2.31 1.866 8.261 9.819 6.557 6.646-1.426 11.727-3.476 12.19-22.545\"></path>\n            <path d=\"M71.208 102.77c-3.518 0-5.808-1.36-7.2-2.674-2.1-1.981-2.933-4.534-3.43-6.059l-.215-.637c-1.002-2.705-1.341-6.599-1.542-11.613-.03-.752-.052-1.529-.075-2.352-.017-.601-.038-1.355-.068-2.146-1.25.599-2.588 1.022-3.997 1.264-2.48.424-5.146.286-7.926-.409-1.961-.49-3.999-1.506-5.16-3.076-3.385 2.965-6.614 2.562-8.373 1.976-3.103-1.035-5.88-3.942-8.491-8.89-1.859-3.523-3.658-8.115-5.347-13.646-2.94-9.633-4.808-19.779-4.974-23.109-.522-10.427 2.284-17.883 8.34-22.16 9.555-6.749 24.03-2.781 29.307-.979 3.545-2.137 7.716-3.178 12.43-3.102 2.532.041 4.942.264 7.181.662 2.335-.734 6.949-1.788 12.23-1.723 9.73.116 17.793 3.908 23.316 10.966 3.941 5.036 1.993 15.61.48 21.466-2.127 8.235-5.856 16.996-10.436 24.622 1.244.009 3.045-.141 5.607-.669 5.054-1.044 6.531 1.666 6.932 2.879 1.607 4.867-5.378 8.544-7.557 9.555-2.792 1.297-7.343 2.086-11.071 1.915l-.163-.011-.979-.086-.097.816-.093.799c-.25 9.664-1.631 15.784-4.472 19.829-2.977 4.239-7.116 5.428-10.761 6.209-1.241.267-2.371.383-3.396.383zm-7.402-35.174c2.271 1.817 2.47 5.236 2.647 11.626.022.797.043 1.552.071 2.257.086 2.134.287 7.132 1.069 9.244.111.298.21.602.314.922.872 2.672 1.31 4.011 5.081 3.203 3.167-.678 4.794-1.287 6.068-3.101 1.852-2.638 2.888-7.941 3.078-15.767l3.852.094-3.826-.459.112-.955c.367-3.148.631-5.424 2.736-6.928 1.688-1.207 3.613-1.09 5.146-.814-1.684-1.271-2.15-2.765-2.274-3.377l-.321-1.582.902-1.34c5.2-7.716 9.489-17.199 11.767-26.018 2.34-9.062 1.626-13.875.913-14.785-9.446-12.071-25.829-7.088-27.539-6.521l-.29.156-1.45.271-.743-.154c-2.047-.425-4.321-.66-6.76-.7-3.831-.064-6.921.841-9.455 2.764l-1.758 1.333-2.041-.841c-4.358-1.782-17.162-5.365-23.918-.58-3.75 2.656-5.458 7.861-5.078 15.47.125 2.512 1.833 12.021 4.647 21.245 3.891 12.746 7.427 16.979 8.903 17.472.257.087.926-.433 1.591-1.231 4.326-5.203 8.44-9.54 8.613-9.723l2.231-2.347 2.697 1.792c1.087.723 2.286 1.132 3.518 1.209l6.433-5.486-.932 9.51c-.021.214-.031.504.053 1.044l.28 1.803-1.213 1.358-.14.157 3.534 1.632 1.482-1.853z\"></path>\n            <path fill=\"#336791\" d=\"M103.646 64.258c-11.216 2.313-11.987-1.484-11.987-1.484 11.842-17.571 16.792-39.876 12.52-45.335-11.655-14.892-31.829-7.849-32.166-7.666l-.109.019c-2.216-.459-4.695-.733-7.482-.778-5.075-.083-8.925 1.33-11.846 3.545 0 0-35.99-14.826-34.316 18.647.356 7.121 10.207 53.882 21.956 39.758 4.294-5.164 8.443-9.531 8.443-9.531 2.061 1.369 4.528 2.067 7.115 1.816l.201-.17c-.062.641-.034 1.268.08 2.01-3.026 3.383-2.138 3.977-8.188 5.222-6.123 1.262-2.526 3.508-.177 4.095 2.847.713 9.433 1.722 13.883-4.509l-.178.711c1.186.95 2.019 6.179 1.879 10.919s-.233 7.994.702 10.536c.935 2.541 1.866 8.261 9.82 6.557 6.646-1.425 10.09-5.116 10.57-11.272.34-4.377 1.109-3.73 1.158-7.644l.618-1.853c.711-5.934.113-7.848 4.208-6.957l.995.087c3.014.138 6.958-.485 9.273-1.561 4.986-2.314 7.943-6.177 3.028-5.162z\"></path>\n            <path fill=\"#fff\" d=\"M71.61 100.394c-6.631.001-8.731-5.25-9.591-7.397-1.257-3.146-1.529-15.358-1.249-25.373.02-.71.607-1.271 1.321-1.249.709.02 1.268.611 1.249 1.321-.323 11.551.136 22.018 1.066 24.346 1.453 3.632 3.656 6.809 9.887 5.475 5.915-1.269 8.13-3.512 9.116-9.23.758-4.389 2.254-16.874 2.438-19.338.053-.708.667-1.24 1.377-1.186.708.053 1.239.67 1.186 1.377-.192 2.564-1.682 15.026-2.469 19.584-1.165 6.755-4.176 9.819-11.11 11.306-1.177.251-2.248.364-3.221.364zM35.659 74.749c-.633.001-1.207-.115-1.704-.281-4.307-1.437-8.409-8.451-12.193-20.849-2.88-9.438-4.705-19.288-4.865-22.489-.475-9.49 1.97-16.205 7.265-19.957 10.476-7.423 28.1-.354 28.845-.05.657.269.972 1.019.703 1.676-.268.656-1.019.972-1.675.703v.001c-.17-.07-17.07-6.84-26.392-.229-4.528 3.211-6.607 9.175-6.18 17.729.135 2.696 1.84 12.311 4.757 21.867 3.378 11.067 7.223 18.052 10.548 19.16.521.175 2.109.704 4.381-2.026 4.272-5.14 8.197-9.242 8.236-9.283.491-.513 1.305-.529 1.817-.039.512.491.53 1.305.039 1.817-.039.04-3.904 4.081-8.116 9.148-1.995 2.398-3.908 3.102-5.466 3.102zM91.579 63.92c-.247 0-.497-.071-.717-.22-.589-.396-.745-1.195-.348-1.784 11.971-17.764 16.173-39.227 12.574-43.825-4.53-5.788-10.927-8.812-19.012-8.985-5.987-.13-10.746 1.399-11.523 1.666l-.195.079c-.782.246-1.382-.183-1.608-.684-.268-.593-.048-1.294.508-1.631l.346-.142-.017.005.018-.006c1.321-.483 6.152-1.933 12.137-1.864 8.947.094 16.337 3.545 21.371 9.977 2.382 3.044 2.387 10.057.015 19.24-2.418 9.362-6.968 19.425-12.482 27.607-.248.369-.654.567-1.067.567zM92.19 72.143c-2.044 0-3.876-.287-4.973-.945-1.128-.675-1.343-1.594-1.371-2.081-.308-5.404 2.674-6.345 4.195-6.774-.212-.32-.514-.697-.825-1.086-.887-1.108-2.101-2.626-3.037-4.896-.146-.354-.606-1.179-1.138-2.133-2.883-5.169-8.881-15.926-5.028-21.435 1.784-2.549 5.334-3.552 10.566-2.992-1.539-4.689-8.869-19.358-26.259-19.643-5.231-.088-9.521 1.521-12.744 4.775-7.217 7.289-6.955 20.477-6.952 20.608.019.71-.542 1.3-1.251 1.318-.71.022-1.3-.541-1.318-1.251-.016-.585-.286-14.424 7.695-22.484 3.735-3.772 8.651-5.634 14.612-5.537 11.128.183 18.289 5.839 22.338 10.553 4.412 5.136 6.576 10.802 6.754 12.692.133 1.406-.876 1.688-1.08 1.729l-.463.011c-5.135-.822-8.429-.252-9.791 1.695-2.931 4.188 2.743 14.363 5.166 18.709.619 1.108 1.065 1.909 1.269 2.404.796 1.93 1.834 3.227 2.668 4.269.733.917 1.369 1.711 1.597 2.645.105.185 1.603 2.399 10.488.565 2.227-.459 3.562-.066 3.97 1.168.803 2.429-3.702 5.261-6.196 6.42-2.238 1.039-5.805 1.696-8.892 1.696zm-3.781-3.238c.281.285 1.691.775 4.612.65 2.596-.112 5.335-.677 6.979-1.439 2.102-.976 3.504-2.067 4.231-2.812l-.404.074c-5.681 1.173-9.699 1.017-11.942-.465-.161-.105-.304-.215-.435-.323-.243.096-.468.159-.628.204-1.273.357-2.589.726-2.413 4.111zM51.712 76.084c-1.411 0-2.896-.191-4.413-.572-1.571-.393-4.221-1.576-4.18-3.519.045-2.181 3.216-2.835 4.411-3.081 4.312-.888 4.593-1.244 5.941-2.955.393-.499.882-1.12 1.548-1.865.99-1.107 2.072-1.669 3.216-1.669.796 0 1.45.271 1.881.449 1.376.57 2.524 1.948 2.996 3.598.426 1.488.223 2.92-.572 4.032-2.608 3.653-6.352 5.582-10.828 5.582zm-5.817-3.98c.388.299 1.164.699 2.027.916 1.314.328 2.588.495 3.79.495 3.662 0 6.601-1.517 8.737-4.506.445-.624.312-1.415.193-1.832-.25-.872-.87-1.665-1.509-1.931-.347-.144-.634-.254-.898-.254-.142 0-.573 0-1.3.813-.614.686-1.055 1.246-1.446 1.741-1.678 2.131-2.447 2.854-7.441 3.883-1.218.252-1.843.506-2.153.675zM55.777 66.176c-.624 0-1.171-.455-1.269-1.09-.033-.213-.054-.428-.064-.644-3.274-.062-6.432-1.466-8.829-3.968-3.031-3.163-4.411-7.545-3.785-12.022.68-4.862.426-9.154.289-11.46-.038-.641-.065-1.104-.063-1.425.002-.406.01-1.485 3.615-3.312 1.282-.65 3.853-1.784 6.661-2.075 4.654-.48 7.721 1.592 8.639 5.836 2.478 11.46.196 16.529-1.47 20.23-.311.688-.604 1.34-.838 1.97l-.207.557c-.88 2.36-1.641 4.399-1.407 5.923.107.702-.374 1.357-1.075 1.466l-.197.014zm-11.143-30.254l.051.918c.142 2.395.406 6.853-.31 11.969-.516 3.692.612 7.297 3.095 9.888 1.962 2.048 4.546 3.178 7.201 3.178h.055c.298-1.253.791-2.575 1.322-4l.206-.553c.265-.712.575-1.401.903-2.13 1.604-3.564 3.6-8 1.301-18.633-.456-2.105-1.56-3.324-3.375-3.726-3.728-.824-9.283 1.98-10.449 3.089zM52.39 35.377c-.064.454.833 1.667 2.001 1.829 1.167.163 2.166-.785 2.229-1.239.063-.455-.833-.955-2.002-1.118-1.167-.163-2.166.073-2.228.528zM54.66 37.654l-.328-.023c-.725-.101-1.458-.558-1.959-1.223-.176-.233-.464-.687-.407-1.091.082-.593.804-.947 1.933-.947.253 0 .515.019.78.055.616.086 1.189.264 1.612.5.733.41.787.866.754 1.103-.091.653-1.133 1.626-2.385 1.626zm-1.844-2.201c.037.28.73 1.205 1.634 1.33l.209.015c.834 0 1.458-.657 1.531-.872-.077-.146-.613-.511-1.631-.651-.225-.032-.448-.048-.661-.048-.652-.001-1.001.146-1.082.226zM87.937 34.45c.063.455-.832 1.668-2.001 1.83-1.168.162-2.167-.785-2.231-1.24-.062-.454.834-.955 2.002-1.117 1.168-.164 2.166.074 2.23.527zM85.667 36.512c-1.125 0-2.094-.875-2.174-1.442-.092-.681 1.029-1.199 2.185-1.359.254-.036.506-.054.749-.054.997 0 1.657.293 1.723.764.043.306-.191.777-.595 1.201-.266.28-.826.765-1.588.87l-.3.02zm.759-2.427c-.223 0-.455.017-.69.049-1.162.161-1.853.628-1.82.878.039.274.78 1.072 1.75 1.072l.239-.017c.634-.089 1.11-.502 1.337-.741.356-.375.498-.727.481-.848-.021-.157-.449-.393-1.297-.393zM89.62 60.538c-.246 0-.494-.07-.714-.217-.59-.396-.748-1.193-.353-1.783 2.736-4.087 2.235-8.256 1.751-12.286-.207-1.718-.42-3.493-.364-5.198.056-1.753.278-3.199.494-4.599.255-1.657.496-3.224.396-5.082-.039-.708.505-1.313 1.214-1.353.711-.038 1.314.506 1.353 1.215.114 2.124-.159 3.896-.423 5.611-.204 1.323-.415 2.691-.466 4.29-.049 1.509.144 3.112.348 4.808.516 4.287 1.099 9.146-2.167 14.023-.248.37-.655.571-1.069.571z\"></path>\n            <path stroke=\"#fff\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.924 17.211\" fill=\"none\"></path>\n            <path d=\"M2.835 103.184c1.093-.182 2.522-.338 4.343-.338 2.235 0 3.874.52 4.914 1.456.962.832 1.534 2.106 1.534 3.667 0 1.586-.469 2.834-1.353 3.744-1.196 1.274-3.146 1.924-5.356 1.924-.676 0-1.3-.026-1.819-.156v7.021h-2.263v-17.318zm2.263 8.45c.494.13 1.118.182 1.872.182 2.729 0 4.394-1.326 4.394-3.744 0-2.314-1.638-3.432-4.134-3.432-.988 0-1.742.078-2.132.182v6.812zM27.328 114.104c0 4.654-3.225 6.683-6.267 6.683-3.406 0-6.032-2.496-6.032-6.475 0-4.212 2.756-6.682 6.24-6.682 3.615-.001 6.059 2.626 6.059 6.474zm-9.984.13c0 2.756 1.586 4.836 3.822 4.836 2.184 0 3.821-2.054 3.821-4.888 0-2.132-1.065-4.836-3.77-4.836s-3.873 2.496-3.873 4.888zM29.901 118.16c.676.442 1.872.91 3.016.91 1.664 0 2.444-.832 2.444-1.872 0-1.092-.649-1.69-2.34-2.314-2.262-.806-3.328-2.054-3.328-3.562 0-2.028 1.638-3.692 4.342-3.692 1.274 0 2.393.364 3.095.78l-.572 1.664c-.494-.312-1.404-.728-2.574-.728-1.352 0-2.106.78-2.106 1.716 0 1.04.755 1.508 2.393 2.132 2.184.832 3.302 1.924 3.302 3.796 0 2.21-1.716 3.77-4.706 3.77-1.378 0-2.652-.338-3.536-.858l.57-1.742zM43.266 104.301v3.614h3.275v1.742h-3.275v6.786c0 1.56.441 2.444 1.716 2.444.598 0 1.04-.078 1.326-.156l.104 1.716c-.441.182-1.144.312-2.027.312-1.066 0-1.925-.338-2.471-.962-.649-.676-.884-1.794-.884-3.276v-6.864h-1.95v-1.742h1.95v-3.016l2.236-.598zM59.802 107.916c-.053.91-.104 1.924-.104 3.458v7.306c0 2.886-.572 4.654-1.794 5.747-1.222 1.144-2.99 1.508-4.576 1.508-1.508 0-3.172-.364-4.187-1.04l.572-1.742c.832.52 2.132.988 3.692.988 2.34 0 4.056-1.222 4.056-4.394v-1.404h-.052c-.702 1.17-2.054 2.106-4.004 2.106-3.12 0-5.356-2.652-5.356-6.137 0-4.264 2.782-6.682 5.668-6.682 2.185 0 3.381 1.144 3.927 2.184h.052l.104-1.898h2.002zm-2.366 4.966c0-.39-.026-.728-.13-1.04-.416-1.326-1.534-2.418-3.198-2.418-2.185 0-3.744 1.846-3.744 4.758 0 2.47 1.248 4.524 3.718 4.524 1.404 0 2.678-.884 3.172-2.34.13-.39.183-.832.183-1.222v-2.262zM63.337 111.842c0-1.482-.026-2.756-.104-3.926h2.003l.077 2.47h.104c.572-1.69 1.95-2.756 3.484-2.756.26 0 .441.026.649.078v2.158c-.233-.052-.468-.078-.779-.078-1.612 0-2.757 1.222-3.068 2.938-.052.312-.104.676-.104 1.066v6.708h-2.262v-8.658zM72.854 114.624c.052 3.094 2.027 4.368 4.315 4.368 1.639 0 2.626-.286 3.484-.65l.39 1.638c-.806.364-2.184.78-4.186.78-3.874 0-6.188-2.548-6.188-6.344 0-3.796 2.236-6.787 5.902-6.787 4.108 0 5.2 3.614 5.2 5.928 0 .468-.052.832-.078 1.066h-8.839zm6.708-1.638c.025-1.456-.599-3.718-3.172-3.718-2.314 0-3.328 2.132-3.511 3.718h6.683z\"></path>\n            <path fill=\"#336791\" d=\"M84.371 117.744c1.014.624 2.496 1.144 4.056 1.144 2.314 0 3.666-1.222 3.666-2.99 0-1.638-.936-2.574-3.302-3.484-2.86-1.014-4.628-2.496-4.628-4.966 0-2.73 2.262-4.758 5.668-4.758 1.794 0 3.094.416 3.874.858l-.624 1.846c-.572-.312-1.742-.832-3.328-.832-2.392 0-3.302 1.43-3.302 2.626 0 1.638 1.065 2.444 3.484 3.38 2.964 1.145 4.472 2.574 4.472 5.148 0 2.704-2.002 5.044-6.136 5.044-1.69 0-3.536-.494-4.473-1.118l.573-1.898zM111.957 123.074c-2.366-.624-4.68-1.326-6.708-2.028-.364-.13-.728-.26-1.066-.26-4.16-.156-7.722-3.224-7.722-8.866 0-5.616 3.432-9.23 8.164-9.23 4.758 0 7.853 3.692 7.853 8.866 0 4.498-2.08 7.384-4.992 8.398v.104c1.742.442 3.64.858 5.122 1.118l-.651 1.898zm-1.872-11.414c0-3.51-1.819-7.125-5.538-7.125-3.822 0-5.694 3.536-5.668 7.333-.026 3.718 2.028 7.072 5.564 7.072 3.615 0 5.642-3.276 5.642-7.28zM115.414 102.976h2.263v15.626h7.488v1.898h-9.751v-17.524z\"></path>\n        </svg>\n        <svg viewBox=\"0 0 256 296\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"xMidYMid\">\n            <title>Sequelize</title>\n            <path d=\"M219.013,94.362 L219.013,200.956 L128.437,254.544 L127.618,255.289 L127.618,295.128 L128.437,295.9 L256,222.216 L256,73.684 L254.795,73.389 L218.832,93.495 L219.013,94.362\" fill=\"#2F406A\"></path>\n            <path d=\"M37.57,201.829 L128.437,254.544 L128.437,295.9 L0,221.925 L0,73.975 L1.318,73.776 L37.177,94.624 L37.57,95.818 L37.57,201.829\" fill=\"#2379BD\"></path>\n            <path d=\"M37.57,95.818 L0,73.975 L128.146,0 L256,73.684 L219.013,94.362 L128.146,42.521 L37.57,95.818\" fill=\"#03AFEF\"></path>\n            <path d=\"M126.878,189.638 L125.894,188.634 L125.894,148.608 L126.878,148.1 L127.117,147.113 L161.432,127.096 L162.482,127.331 L162.482,168.573 L126.878,189.638\" fill=\"#2F406A\"></path>\n            <path d=\"M90.68,169.858 L90.68,127.035 L91.675,126.986 L126.581,147.3 L126.878,148.1 L126.878,189.638 L90.68,169.858\" fill=\"#2379BD\"></path>\n            <path d=\"M126.284,105.969 L90.68,127.035 L126.878,148.1 L162.482,127.331 L126.284,105.969\" fill=\"#03AFEF\"></path>\n            <path d=\"M82.57,215.748 L81.587,214.744 L81.587,174.717 L82.57,174.21 L82.81,173.223 L117.124,153.206 L118.174,153.441 L118.174,194.682 L82.57,215.748\" fill=\"#2F406A\"></path>\n            <path d=\"M46.373,195.968 L46.373,153.144 L47.367,153.095 L82.273,173.41 L82.57,174.21 L82.57,215.748 L46.373,195.968\" fill=\"#2379BD\"></path>\n            <path d=\"M81.977,132.079 L46.373,153.144 L82.57,174.21 L118.174,153.441 L81.977,132.079\" fill=\"#03AFEF\"></path>\n            <path d=\"M174.35,216.737 L173.366,215.733 L173.366,175.706 L174.35,175.199 L174.589,174.212 L208.904,154.195 L209.954,154.43 L209.954,195.671 L174.35,216.737\" fill=\"#2F406A\"></path>\n            <path d=\"M138.152,196.957 L138.152,154.133 L139.147,154.084 L174.053,174.399 L174.35,175.199 L174.35,216.737 L138.152,196.957\" fill=\"#2379BD\"></path>\n            <path d=\"M173.756,133.068 L138.152,154.133 L174.35,175.199 L209.954,154.43 L173.756,133.068\" fill=\"#03AFEF\"></path>\n            <path d=\"M130.042,242.847 L129.059,241.843 L129.059,201.816 L130.042,201.309 L130.282,200.321 L164.597,180.305 L165.646,180.54 L165.646,221.781 L130.042,242.847\" fill=\"#2F406A\"></path>\n            <path d=\"M93.845,223.067 L93.845,180.243 L94.839,180.194 L129.746,200.508 L130.042,201.309 L130.042,242.847 L93.845,223.067\" fill=\"#2379BD\"></path>\n            <path d=\"M129.449,159.177 L93.845,180.243 L130.042,201.309 L165.646,180.54 L129.449,159.177\" fill=\"#03AFEF\"></path>\n            <path d=\"M126.878,132.87 L125.894,131.865 L125.894,91.839 L126.878,91.332 L127.117,90.344 L161.432,70.328 L162.482,70.563 L162.482,111.804 L126.878,132.87\" fill=\"#2F406A\"></path>\n            <path d=\"M90.68,113.09 L90.68,70.266 L91.675,70.217 L126.581,90.531 L126.878,91.332 L126.878,132.87 L90.68,113.09\" fill=\"#2379BD\"></path>\n            <path d=\"M126.284,49.2 L90.68,70.266 L126.878,91.332 L162.482,70.563 L126.284,49.2\" fill=\"#03AFEF\"></path>\n            <path d=\"M82.57,158.979 L81.587,157.975 L81.587,117.949 L82.57,117.441 L82.81,116.454 L117.124,96.437 L118.174,96.672 L118.174,137.914 L82.57,158.979\" fill=\"#2F406A\"></path>\n            <path d=\"M46.373,139.199 L46.373,96.376 L47.367,96.327 L82.273,116.641 L82.57,117.441 L82.57,158.979 L46.373,139.199\" fill=\"#2379BD\"></path>\n            <path d=\"M81.977,75.31 L46.373,96.376 L82.57,117.441 L118.174,96.672 L81.977,75.31\" fill=\"#03AFEF\"></path>\n            <path d=\"M174.35,159.968 L173.366,158.964 L173.366,118.938 L174.35,118.43 L174.589,117.443 L208.904,97.426 L209.954,97.661 L209.954,138.903 L174.35,159.968\" fill=\"#2F406A\"></path>\n            <path d=\"M138.152,140.188 L138.152,97.365 L139.147,97.316 L174.053,117.63 L174.35,118.43 L174.35,159.968 L138.152,140.188\" fill=\"#2379BD\"></path>\n            <path d=\"M173.756,76.299 L138.152,97.365 L174.35,118.43 L209.954,97.661 L173.756,76.299\" fill=\"#03AFEF\"></path>\n            <path d=\"M130.042,186.078 L129.059,185.074 L129.059,145.047 L130.042,144.54 L130.282,143.553 L164.597,123.536 L165.646,123.771 L165.646,165.012 L130.042,186.078\" fill=\"#2F406A\"></path>\n            <path d=\"M93.845,166.298 L93.845,123.474 L94.839,123.425 L129.746,143.74 L130.042,144.54 L130.042,186.078 L93.845,166.298\" fill=\"#2379BD\"></path>\n            <path d=\"M129.449,102.408 L93.845,123.474 L130.042,144.54 L165.646,123.771 L129.449,102.408\" fill=\"#03AFEF\"></path>\n        </svg>\n    </div>\n    <h3>Further Tooling</h3>\n    <div class=\"iconFlex\">\n        <svg viewBox=\"0 0 128 128\">\n            <title>Git</title>\n            <path fill=\"#F34F29\" d=\"M124.737 58.378l-55.116-55.114c-3.172-3.174-8.32-3.174-11.497 0l-11.444 11.446 14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679-3.78 3.78-9.901 3.78-13.683 0-2.842-2.844-3.545-7.019-2.105-10.521l-13.048-13.048-.002 34.341c.922.455 1.791 1.063 2.559 1.828 3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683.934-.933 2.014-1.638 3.167-2.11v-34.659c-1.153-.472-2.231-1.172-3.167-2.111-2.862-2.86-3.551-7.06-2.083-10.576l-14.313-14.313-37.792 37.79c-3.175 3.177-3.175 8.325 0 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858c3.174-3.176 3.174-8.327-.001-11.501z\"></path>\n        </svg> \n        <svg viewBox=\"0 0 128 128\">\n            <title>GitHub</title>\n            <path fill=\"white\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z\"></path>\n            <path fill=\"white\" d=\"M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0\"></path>\n        </svg>\n        <img src=\"./img/vs.png\" title=\"Visual Studio + TFVC\"/>\n        <img src=\"./img/bash.png\" title=\"Bash\"/>\n        <img src=\"./img/powershell.png\" title=\"Powershell\"/>\n        <img src=\"./img/webpack.png\" title=\"Webpack\"/>\n        <img src=\"./img/gulp.png\" title=\"Gulp\"/>\n        <svg viewBox=\"0 0 128 128\">\n            <title>Grunt</title>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#493310\" d=\"M95.829 88.914c3.585-2.669 5.424-6.045 6.278-10.224 4.158 4.112 5.623 8.948 5.28 14.41-.465 7.407-3.867 12.805-10.891 15.705-.55.228-1.046.827-1.349 1.375-3.292 5.965-8.135 9.74-14.96 10.819-.572.09-1.143.416-1.635.749-8.116 5.477-21.017 5.457-29.175-.038-.535-.361-1.192-.629-1.828-.738-6.137-1.061-10.799-4.298-13.954-9.611-.917-1.546-1.983-2.586-3.641-3.343-11.845-5.406-11.643-22.932-4.233-29.038.723 1.785 1.281 3.66 2.215 5.326.942 1.681 2.256 3.153 3.407 4.717l.564-.154c.195-1.959.455-3.914.568-5.877.159-2.764.28-5.535.288-8.304.01-3.38-1.254-6.012-4.446-7.656-2.337-1.204-4.67-2.537-6.704-4.184-4.972-4.026-4.846-9.453.18-13.347 1.207-.934 1.923-2.001 2.064-3.511.297-3.182.797-6.355-1.482-9.161-.632-.778-.95-1.858-1.252-2.849-1.472-4.817.898-8.657 5.89-9.44 1.439-.226 2.222-.598 2.394-2.273.307-2.985-.334-5.035-3.084-6.473-2.189-1.146-4.63-1.812-7.047-2.725 2.824-4.058 7.024-5.908 11.946-6.205 6.508-.394 11.61 2.577 15.951 7.134.721.756 1.324 1.63 2.083 2.342.375.353.993.645 1.472.606.249-.021.584-.809.624-1.271.326-3.821 2.052-6.905 4.869-9.419.48-.428 1.088-.713 1.649-1.072l1.382 6.472.6-.006c.99-5.185 4.528-7.827 9.161-9.493-.097 1.552-.324 3.006-.239 4.441.083 1.375.488 2.732.803 4.359 2.635-1.838 4.929-3.746 7.934-3.667-.647 2.462-1.35 4.859-1.888 7.293-.276 1.249.069 2.433 1.658 2.4.581-.012 1.298-.465 1.701-.934 3.424-3.979 7.22-7.383 12.502-8.692 6.737-1.67 13.518.59 17.356 5.953-.729.179-1.415.292-2.062.518-1.671.586-3.442 1.015-4.96 1.88-3.216 1.833-3.731 3.565-2.961 7.677.07.371.66.762 1.09.92.683.25 1.452.256 2.155.464 4.107 1.209 6.069 4.611 4.896 8.717-.416 1.456-1.07 2.894-1.876 4.177-2.089 3.325-1.314 6.75-.458 10.14.19.751 1.187 1.348 1.896 1.913 4.33 3.451 4.747 8.714.589 12.396-2.313 2.048-5.117 3.585-7.829 5.126-2.491 1.415-3.956 3.483-3.964 6.208-.021 5.155.295 10.311.473 15.468zm-17.901-8.872l-.02.015c-.014.115.023.21.112.285l.313.75c1.112 2.919 2.178 5.857 3.347 8.752 1.395 3.457.43 3.329 4.852 2.93l3.656-.669c1.913-.037 2.411-.992 2.261-2.854-.366-4.526-.499-9.071-.755-13.607-.327-5.783 1.935-9.909 7.354-12.362 1.968-.891 3.84-2.261 5.368-3.798 2.324-2.339 1.663-5.892-1.174-7.519l-.244 2.003c-2.154-3.37-2.778-6.792-3.341-10.236l-.058-1.837c.088-.109.098-.225.027-.346l.879-6.657.34.05.495 2.085c.711-1.244 1.296-2.104 1.718-3.035 1.656-3.664.166-6.115-3.903-6.062-2.426.031-4.901.391-7.256.988-6.147 1.559-11.187 5.234-16.205 8.906-.501.367-1.026.703-1.54 1.053l-.238-.278 2.604-3.729.641-.748c.088-.057.142-.137.161-.241l9.737-7.8-5.92-3.158-.08.013-.429-.317c-6.837-3.207-14.108-3.861-21.441-2.985-4.021.48-7.921 1.971-11.876 3.005-2.329.905-4.544 1.985-6.054 3.649l9.732 7.91-.004-.016.351.483 2.74 3.949c-3.093-1.732-5.883-3.707-8.754-5.557-4.446-2.864-9.268-4.779-14.585-5.153-2.251-.158-4.912-.428-6.082 1.983-1.211 2.496.439 4.702 1.83 6.753.052.077.214.08.394.141l.225-1.946c.449.953.726 1.895.836 2.856.216 1.886.34 3.783.503 5.676-.367 1.793-.607 3.626-1.137 5.37-.541 1.781-1.366 3.475-2.067 5.208l-.399-.185-.115-1.783c-3.2 1.951-3.384 5.95-.309 8.402 1.858 1.481 3.981 2.67 6.093 3.787 3.973 2.1 5.779 5.461 5.716 9.782-.071 4.974-.372 9.946-.658 14.915-.154 2.674-.234 2.67 2.196 3.238l4.008.685c1.275-.103 2.919 1.074 3.694-.819 1.53-3.735 2.938-7.52 4.396-11.284.063-.09.093-.19.091-.3l.371-.789 1.484-2.832.443.156c-.663 6.637-3.001 12.894-4.993 19.399 11.109 0 21.915.001 32.72-.006.174 0 .347-.083.463-.113l-5.401-20.483.608-.187 2.013 4.064.266.45zm12.658 30.609c-4.079-.202-5.498.998-6.464 5.601 2.658-1.411 4.987-3 6.436-5.625l.056-.138-.028.162zm11.852-23.638c-3.496 7.166-10.123 8.802-17.019 9.588l3.291 6.277-.511 4.114c5.525-.342 10.373-2 13.492-6.758 2.904-4.432 2.777-9.332 1.235-14.321l-.488 1.1zm-77.224-.562c-.02-.116-.022-.324-.064-.333-.126-.026-.383.012-.388.05-.262 2.045-.738 4.098-.703 6.142.122 7.133 3.973 12.004 10.859 13.893 1.583.434 3.245.582 4.938.874l-.625-4.198 3.395-6.311c-7.302-.684-13.935-2.694-17.412-10.117zm57.22 24.912l.394-.725c.587-1.341 1.273-2.649 1.744-4.029 1.516-4.451-.194-6.876-4.903-7.07-.307-.013-.614-.018-.921-.018-9.829-.001-19.658-.011-29.486.014-.972.002-1.965.115-2.911.337-2.918.685-4.064 2.405-3.295 5.288.5 1.877 1.388 3.651 2.102 5.472l.37.678.277.457c1.599 2.067 2.877 4.529 4.854 6.129 6.5 5.262 13.94 5.696 21.585 3.03 4.715-1.645 8.111-4.97 10.191-9.562l-.001-.001zm19.333-99.527c-7.302-3.192-14.822-.398-19.156 7.122l2.544 1.235c3.333-4.952 7.951-8.023 13.699-7.434.815.084 1.701-.518 2.913-.923zm-75.06.311c1.085.205 2.172.595 3.255.581 3.265-.044 6.236.738 8.7 2.911 1.542 1.359 2.908 2.918 4.429 4.466l2.321-1.191c-3.911-7.178-11.964-10.332-18.705-6.767zm69.116 3.548c-.308.048-.834.085-1.335.219-2.59.693-4.169 2.517-5.121 4.884-.291.723-.451 1.907-.063 2.41.805 1.044 1.511 2.477 3.513 1.8 1.343-.454 1.697-1.23 1.884-2.352.369-2.214.716-4.432 1.122-6.961zm-63.702.101c.3 1.698.586 3.301.865 4.904.146.843.263 1.69.422 2.53.334 1.752 2.019 2.214 3.07 1.862 1.105-.37 2.492-1.801 2.598-2.883.287-2.925-3.853-6.43-6.955-6.413zm5.201 94.87c1.622 2.41 3.773 4.262 6.916 5.677-1.702-3.114-2.233-6.847-6.916-5.677z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#F5A900\" d=\"M28.444 43.369c-.163-1.894-.287-3.79-.503-5.676-.11-.961-.387-1.903-.836-2.856l-.225 1.946c-.18-.061-.342-.063-.394-.141-1.391-2.051-3.041-4.257-1.83-6.753 1.17-2.411 3.831-2.141 6.082-1.983 5.317.375 10.14 2.29 14.585 5.153 2.871 1.85 5.661 3.825 8.754 5.557l-2.74-3.949-.351-.482.005.016c-.604-1.435-1.105-2.923-1.833-4.292-1.216-2.289-2.946-4.406-1.846-7.268 3.955-1.035 7.855-2.525 11.876-3.005 7.333-.876 14.604-.222 21.441 2.986l.429.316.078-.012c.088 2.524-.88 4.675-2.152 6.797-.758 1.265-1.122 2.765-1.663 4.16-.019.104-.073.184-.16.242l-.642.747-2.604 3.729.238.278c.514-.35 1.039-.686 1.54-1.053 5.018-3.672 10.057-7.348 16.205-8.906 2.355-.597 4.831-.957 7.256-.988 4.069-.053 5.559 2.398 3.903 6.062-.422.932-1.007 1.792-1.718 3.035l-.495-2.085-.34-.05-.879 6.657-.083.102.055.245.058 1.837c-.195.523-.557 1.045-.561 1.569-.037 4.258.342 8.422 3.608 12.165-2.589 1.316-4.879 2.583-7.255 3.66-2.155.978-4.393 1.852-5.167 4.333-.642 2.06-1.01 4.205-1.496 6.294l-1.197-3.32c-.349 8.095.021 16.019 2.597 23.672l-3.656.669c-2.442-3.714-4.877-7.432-7.341-11.131-.173-.259-.566-.371-.857-.551l-.313-.75.157-.222-.269-.063.021-.015-.268-.448-2.013-4.064-.608.187c1.799 6.82 3.597 13.641 5.401 20.483-.116.03-.29.113-.463.113-10.805.007-21.61.006-32.72.006 1.991-6.506 4.33-12.762 4.993-19.399l-.443-.156-1.485 2.832-.371.789c.002.11-.028.209-.09.3-.36.287-.819.508-1.065.872-1.8 2.671-3.582 5.356-5.316 8.071-.643 1.007-1.144 2.104-1.709 3.16l-4.008-.685c2.695-7.634 3.03-15.542 2.673-23.542l-1.268 3.312c-.271-5.412-1.882-9.494-7.597-11.164-2.179-.637-4.073-2.247-5.643-3.151.979-2.485 2.092-4.329 2.383-6.296.386-2.583.121-5.261.135-7.896zm41.428.407l.371-.383.904-1.048c-2.348.23-4.634.638-6.918.626-2.304-.013-4.607-.443-6.91-.689l-.48-.134.48.133.736 1.479c4.106 4.667 7.536 4.76 11.666.313.08-.086.119-.21.177-.316l-.026.019zm-22.901 24.735l4.404-2.722c.989-1.944 2.169-3.822 2.882-5.862.34-.975.525-1.511 1.586-1.79 2.329-.61 3.526-2.182 3.467-4.209l-2.333.285c-2.496-1.417-4.387-3.386-5.922-5.834-.854-1.362-2.183-2.476-3.443-3.527-2.685-2.24-6.047-2.75-9.332-2.82-2.018-.042-4.057.918-6.086 1.428-.062.061-.13.067-.204.023l-.535.228-.103.15c-.009.05.017.146.05.158.73.259 1.463.51 2.324.808-1.957 2.457-1.711 4.791-.216 7.343l.776-2.733.374.035.189 1.932.247.857.144.573c-.203 6.192 5.334 10.651 13.567 10.499l-1.831 5.184-.084.149.079-.155zm33.995-.001l.146.088-.152-.082-1.766-5.241c9.595.948 13.532-5.575 13.878-11.533l.379-2.249.312.012.72 2.677c1.45-2.578 1.823-4.927-.206-7.306l2.408-.946-1.002-.393c-.49-.298-.959-.81-1.472-.857-2.212-.208-4.447-.479-6.653-.357-4.382.242-7.989 2.152-10.46 5.846-1.643 2.456-3.413 4.716-6.137 6.043l-2.523-.286c.403 2.402 1.772 3.651 3.877 4.317.498.158 1.002.693 1.247 1.184 1.052 2.096 2.009 4.24 3 6.367l4.404 2.716z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#F5A800\" d=\"M45.156 110.632c-.714-1.82-1.602-3.594-2.102-5.472-.769-2.883.377-4.603 3.295-5.288.946-.222 1.939-.335 2.911-.337 9.829-.024 19.658-.015 29.486-.014.307 0 .615.005.921.018 4.709.193 6.419 2.619 4.903 7.07-.47 1.38-1.156 2.688-1.744 4.029l-.394.725-.001.002c-1.271.826-2.508 1.711-3.82 2.466-3.299 1.893-6.894 2.751-10.66 3.203-5.151.619-10.176.227-14.996-1.621-2.485-.953-4.775-2.415-7.153-3.646l-.277-.457-.369-.678zm35.398-2.974l.405-.728c1.126-2.9.622-3.686-2.443-3.722-2.276-.025-4.554-.044-6.83.006-2.209.048-2.7.762-2.111 2.877.266 1.104.379 2.277.83 3.3 1.147 2.607 3.221 4.062 5.057 3.755 2.499-.417 4.74-2.834 5.103-5.503l-.011.015zm-33.181-.002l-.005-.009c.417 2.772 2.093 4.478 4.67 5.313 1.817.588 3.416-.232 4.299-1.65.964-1.549 1.394-3.43 2.057-5.167.632-2.164.186-2.856-2.014-2.921-1.965-.059-3.933-.028-5.9-.012-4.222.033-4.304.135-3.49 4.065l.383.381z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#E08700\" d=\"M28.444 43.369c-.014 2.635.251 5.313-.132 7.893-.292 1.967-1.405 3.811-2.383 6.296 1.57.904 3.464 2.514 5.643 3.151 5.714 1.67 7.326 5.752 7.597 11.164l1.268-3.312c.356 8 .021 15.907-2.673 23.542-2.43-.567-2.35-.563-2.196-3.238.287-4.968.587-9.941.658-14.915.063-4.321-1.743-7.682-5.716-9.782-2.112-1.116-4.234-2.305-6.093-3.787-3.075-2.453-2.891-6.451.309-8.402l.115 1.783.399.185c.701-1.732 1.526-3.427 2.067-5.208.53-1.744.77-3.576 1.137-5.37zM90.187 92.106c-2.576-7.654-2.946-15.578-2.597-23.672l1.197 3.32c.485-2.09.854-4.235 1.496-6.294.774-2.48 3.012-3.355 5.167-4.333 2.375-1.077 4.666-2.343 7.255-3.66-3.266-3.743-3.645-7.907-3.608-12.165.004-.524.366-1.046.561-1.569.563 3.444 1.187 6.867 3.341 10.236l.244-2.003c2.836 1.627 3.498 5.18 1.174 7.519-1.527 1.538-3.399 2.907-5.368 3.798-5.42 2.453-7.682 6.579-7.354 12.362.256 4.536.389 9.081.755 13.607.148 1.862-.35 2.817-2.263 2.854zm13.132-37.907l-.051.098.077.01-.026-.108z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#E08600\" d=\"M45.804 111.767c2.378 1.231 4.668 2.693 7.153 3.646 4.819 1.848 9.845 2.24 14.996 1.621 3.766-.452 7.361-1.31 10.66-3.203 1.313-.754 2.549-1.64 3.82-2.466-2.08 4.592-5.476 7.917-10.191 9.562-7.645 2.666-15.085 2.231-21.585-3.03-1.976-1.601-3.255-4.063-4.853-6.13z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#fff\" d=\"M25.214 86.451c3.478 7.423 10.11 9.433 17.412 10.118l-3.395 6.311c-8.735-.714-14.363-7.31-14.017-16.429zM88.71 102.879c-1.089-2.079-2.178-4.156-3.291-6.277 6.896-.787 13.523-2.423 17.019-9.588.11.454.329.911.313 1.361-.258 7.505-5.405 13.825-14.041 14.504z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#C7C6C6\" d=\"M25.214 86.451c-.346 9.119 5.282 15.714 14.017 16.428l.625 4.198c-1.694-.292-3.355-.44-4.938-.874-6.886-1.888-10.737-6.76-10.859-13.893-.035-2.043.441-4.096.703-6.142.005-.039.262-.077.388-.05.042.009.044.217.064.333zM88.71 102.879c8.636-.679 13.783-6.999 14.042-14.505.016-.45-.204-.907-.313-1.361l.488-1.1c1.542 4.989 1.669 9.889-1.235 14.321-3.119 4.759-7.967 6.416-13.492 6.758l.51-4.113z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#F0A500\" d=\"M101.767 11.836c-1.212.405-2.098 1.007-2.913.923-5.748-.589-10.365 2.482-13.699 7.434l-2.544-1.235c4.334-7.52 11.854-10.314 19.156-7.122zM26.707 12.147c6.741-3.565 14.794-.411 18.705 6.766l-2.321 1.191c-1.521-1.548-2.888-3.106-4.429-4.466-2.464-2.172-5.435-2.955-8.7-2.911-1.083.015-2.17-.375-3.255-.58z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DE8500\" d=\"M95.823 15.695c-.407 2.529-.753 4.747-1.122 6.961-.187 1.122-.541 1.898-1.884 2.352-2.001.677-2.708-.756-3.513-1.8-.388-.503-.229-1.687.063-2.41.951-2.367 2.53-4.191 5.121-4.884.501-.134 1.027-.171 1.335-.219zM32.121 15.796c3.102-.017 7.242 3.487 6.955 6.414-.106 1.082-1.493 2.513-2.598 2.883-1.051.352-2.736-.11-3.07-1.862-.159-.84-.276-1.688-.422-2.53-.279-1.604-.565-3.207-.865-4.905z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#E08600\" d=\"M47.313 22.641c-1.1 2.862.63 4.979 1.846 7.268.727 1.369 1.229 2.856 1.833 4.292-3.203-2.603-6.406-5.206-9.732-7.91 1.508-1.665 3.723-2.745 6.053-3.65z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DE8600\" d=\"M77.321 33.883c.541-1.395.905-2.895 1.663-4.16 1.272-2.123 2.24-4.273 2.152-6.797 2.001 1.065 4 2.131 5.922 3.157-3.488 2.793-6.612 5.297-9.737 7.8zM78.333 81.093c.291.18.684.292.857.551 2.464 3.699 4.899 7.417 7.341 11.131-4.422.399-3.457.527-4.852-2.93-1.168-2.895-2.234-5.833-3.346-8.752zM41.771 92.787c.566-1.056 1.066-2.153 1.709-3.16 1.734-2.714 3.516-5.399 5.316-8.071.246-.364.705-.585 1.065-.872-1.459 3.764-2.867 7.549-4.396 11.284-.775 1.893-2.419.716-3.694.819z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#ECA200\" d=\"M37.322 110.666c4.683-1.17 5.214 2.563 6.916 5.677-3.143-1.416-5.295-3.267-6.916-5.677zM90.558 110.627c-1.449 2.624-3.778 4.214-6.436 5.625.967-4.603 2.386-5.803 6.464-5.601l-.028-.024zM90.586 110.651l.027-.163-.056.139.029.024z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DE8600\" d=\"M77.908 80.057l.269.063-.157.222c-.089-.074-.126-.17-.112-.285z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#E08700\" d=\"M99.599 41.896l-.055-.245.083-.102c.07.122.061.237-.028.347z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#49330E\" d=\"M76.563 65.794c-.991-2.126-1.948-4.271-3-6.367-.245-.49-.749-1.026-1.247-1.184-2.105-.667-3.474-1.916-3.877-4.317l2.523.286c.474.033.958.147 1.419.085 2.207-.299 3.714-1.697 5.181-3.243 4.916-5.184 10.683-8.387 18.124-7.516l1.002.393-2.408.946c2.028 2.379 1.656 4.728.206 7.306l-.72-2.677-.312-.012-.379 2.25c-1.058 2.485-2.065 4.994-4.646 6.388-3.756 2.028-7.527 2.915-11.326.22-1.623 2.466-.664 4.981-.54 7.442zm12.433-13.94v-4.628c-3.894 2.292-7.218 4.52-9.882 7.614l-1.099 1.328c3.718 2.788 10.989.954 10.981-4.314z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#49330F\" d=\"M35.239 52.833l-.144-.573-.247-.857-.189-1.932-.374-.035-.776 2.733c-1.495-2.552-1.741-4.886.216-7.343-.861-.297-1.594-.548-2.324-.808-.033-.012-.06-.108-.05-.158l.103-.15.535-.228c.073.044.142.038.204-.023 2.786.306 5.659.286 8.339.993 4.209 1.111 7.459 3.9 10.367 7.081 1.617 1.768 3.475 3.095 6.077 2.679l2.333-.285c.059 2.028-1.138 3.599-3.467 4.209-1.061.279-1.246.815-1.586 1.79-.713 2.041-1.893 3.918-2.882 5.861.247-2.49 1.094-5.026-.542-7.473-1.98 1.479-4.139 2.021-6.474 1.602-4.258-.766-7.411-3.006-9.119-7.083zm13.612 1.973c-2.666-3.085-5.982-5.317-9.872-7.583v4.625c.062 5.38 7.409 7.086 10.925 4.365-.105-.193-.193-.416-.334-.597-.221-.285-.478-.542-.719-.81z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#E08700\" d=\"M76.563 65.794c-.124-2.462-1.083-4.976.539-7.443 3.799 2.694 7.57 1.808 11.326-.22 2.581-1.395 3.588-3.903 4.646-6.388-.346 5.957-4.284 12.48-13.878 11.532l1.766 5.241.005-.006-4.404-2.716zM35.239 52.833c1.708 4.077 4.86 6.317 9.12 7.083 2.335.42 4.494-.123 6.474-1.602 1.635 2.447.788 4.983.542 7.473l-4.404 2.724.005.005 1.831-5.184c-8.233.152-13.771-4.307-13.568-10.499z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DE8600\" d=\"M56.977 54.212c-2.602.416-4.46-.911-6.077-2.679-2.908-3.181-6.158-5.97-10.367-7.081-2.68-.708-5.553-.688-8.339-.993 2.029-.51 4.068-1.471 6.085-1.428 3.285.07 6.647.58 9.332 2.82 1.261 1.051 2.589 2.165 3.443 3.527 1.536 2.448 3.427 4.417 5.923 5.834z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DF8600\" d=\"M95.684 43.538c-7.44-.871-13.208 2.332-18.124 7.516-1.466 1.546-2.974 2.944-5.181 3.243-.461.063-.945-.052-1.419-.085 2.724-1.327 4.495-3.587 6.137-6.043 2.471-3.694 6.078-5.604 10.46-5.846 2.207-.122 4.441.15 6.653.357.515.049.984.56 1.474.858zM58.054 43.76l-.736-1.479v.001c2.303.247 4.605.676 6.91.689 2.284.012 4.57-.396 6.918-.626l-.903 1.048-.371.383.025-.021c-2.306.388-4.606 1.02-6.921 1.08-1.63.044-3.281-.689-4.922-1.075z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#52380B\" d=\"M58.054 43.76c1.641.387 3.292 1.119 4.921 1.076 2.315-.061 4.615-.692 6.921-1.08-.058.106-.097.23-.177.316-4.129 4.448-7.558 4.355-11.665-.312z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#47310D\" d=\"M69.575 106.091c-.589-2.115-.098-2.829 2.111-2.877 2.276-.05 4.554-.031 6.83-.006 3.065.036 3.57.822 2.443 3.722l-.405.728.01-.015c-.532.576-1.049 1.167-1.6 1.726-2.498 2.536-5.238 2.372-7.4-.459-.697-.913-1.328-1.877-1.989-2.819z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#47310E\" d=\"M46.99 107.274c-.814-3.931-.732-4.033 3.49-4.065 1.967-.016 3.935-.047 5.9.012 2.2.065 2.646.758 2.014 2.921-.746 1.048-1.454 2.126-2.246 3.139-1.853 2.369-4.484 2.518-6.695.41-.704-.671-1.391-1.363-2.086-2.044l.004.009-.381-.382z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DC8400\" d=\"M47.368 107.647c.695.682 1.382 1.373 2.086 2.044 2.211 2.107 4.842 1.959 6.695-.41.792-1.013 1.5-2.091 2.246-3.139-.663 1.737-1.092 3.618-2.057 5.167-.884 1.418-2.482 2.238-4.299 1.65-2.578-.834-4.254-2.54-4.671-5.312z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#DE8500\" d=\"M69.575 106.091c.661.941 1.292 1.905 1.989 2.819 2.162 2.831 4.902 2.995 7.4.459.551-.559 1.067-1.15 1.6-1.726-.363 2.669-2.604 5.086-5.103 5.503-1.835.307-3.91-1.148-5.057-3.755-.449-1.023-.563-2.196-.829-3.3z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#493310\" d=\"M103.319 54.199l.026.108-.077-.01z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#fff\" d=\"M79.114 54.841c2.664-3.095 5.989-5.323 9.882-7.614v4.628c-1.606 2.047-3.421 3.875-6.217 3.872-1.222-.003-2.444-.574-3.665-.886z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#C5C4C3\" d=\"M79.114 54.841c1.222.312 2.443.883 3.665.885 2.796.004 4.611-1.824 6.217-3.872.008 5.268-7.263 7.102-10.981 4.314l1.099-1.327z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#fff\" d=\"M38.979 51.847v-4.625c3.889 2.267 7.206 4.498 9.872 7.583-1.536 1.385-4.652 1.428-6.902-.117-1.115-.765-1.988-1.883-2.97-2.841z\"></path>\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#C5C4C3\" d=\"M38.979 51.847c.982.958 1.855 2.077 2.97 2.842 2.25 1.545 5.366 1.502 6.902.117.242.269.499.525.719.81.141.181.229.403.334.597-3.516 2.72-10.863 1.014-10.925-4.366z\"></path>\n        </svg>\n    </div>\n    </div>\n    <div class=\"education\" id=\"eduMobile\">\n        <h3>Education</h3>\n        <div class=\"school\">\n            <h4>Nashville Software School</h4>\n            <section class=\"schoolDetail\">\n                <p>\n                    <span class=\"study\">Cohort 23:</span>\n                    <span>November 2017 - May 2018</span>\n                </p>\n                <p>\n                    <span class=\"study\">Concentration:</span>\n                    <span>Javascript Fullstack Development</span>\n                </p>\n            </section>\n        </div>\n        <div class=\"school\">\n            <h4>Middle Tennessee State University</h4>\n            <section class=\"schoolDetail\">\n                <p>Class of Spring 2012</p>\n                <p>\n                    <span class=\"study\">Concentration:</span> Audio Engineering</p>\n            </section>\n        </div>\n    </div>\n    <div id=\"personal\">\n        <h2>Personal</h2>\n        <div id=\"favOut\">\n            <button id=\"favBtn\" class=\"btnFlash\">Fact//Fav</button>\n            <div id=\"favTitleOut\"></div>\n            <div id=\"favTextOut\"></div>\n        </div>\n    </div>\n    <div id=\"catto\">\n        <p>Also, here's a pic of my deng catto doing a heckin' lounge.</p>\n        <img id=\"lars\" src=\"img/lars.jpg\">\n    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":25}],28:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main class=\"contactMain\">\n    <h1 id=\"contactHeader\">Connect</h1>\n    <div class=\"grid\">\n        <div class=\"item email\" onclick=\"window.location.href='mailto:iiimosley@gmail.com';\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 511.626 511.626\" style=\"enable-background:new 0 0 511.626 511.626;\"\n                xml:space=\"preserve\">\n                <path d=\"M49.106,178.729c6.472,4.567,25.981,18.131,58.528,40.685c32.548,22.554,57.482,39.92,74.803,52.099\n            			c1.903,1.335,5.946,4.237,12.131,8.71c6.186,4.476,11.326,8.093,15.416,10.852c4.093,2.758,9.041,5.852,14.849,9.277\n            			c5.806,3.422,11.279,5.996,16.418,7.7c5.14,1.718,9.898,2.569,14.275,2.569h0.287h0.288c4.377,0,9.137-0.852,14.277-2.569\n            			c5.137-1.704,10.615-4.281,16.416-7.7c5.804-3.429,10.752-6.52,14.845-9.277c4.093-2.759,9.229-6.376,15.417-10.852\n            			c6.184-4.477,10.232-7.375,12.135-8.71c17.508-12.179,62.051-43.11,133.615-92.79c13.894-9.703,25.502-21.411,34.827-35.116\n            			c9.332-13.699,13.993-28.07,13.993-43.105c0-12.564-4.523-23.319-13.565-32.264c-9.041-8.947-19.749-13.418-32.117-13.418H45.679\n            			c-14.655,0-25.933,4.948-33.832,14.844C3.949,79.562,0,91.934,0,106.779c0,11.991,5.236,24.985,15.703,38.974\n            			C26.169,159.743,37.307,170.736,49.106,178.729z\" />\n                <path d=\"M483.072,209.275c-62.424,42.251-109.824,75.087-142.177,98.501c-10.849,7.991-19.65,14.229-26.409,18.699\n            			c-6.759,4.473-15.748,9.041-26.98,13.702c-11.228,4.668-21.692,6.995-31.401,6.995h-0.291h-0.287\n            			c-9.707,0-20.177-2.327-31.405-6.995c-11.228-4.661-20.223-9.229-26.98-13.702c-6.755-4.47-15.559-10.708-26.407-18.699\n            			c-25.697-18.842-72.995-51.68-141.896-98.501C17.987,202.047,8.375,193.762,0,184.437v226.685c0,12.57,4.471,23.319,13.418,32.265\n            			c8.945,8.949,19.701,13.422,32.264,13.422h420.266c12.56,0,23.315-4.473,32.261-13.422c8.949-8.949,13.418-19.694,13.418-32.265\n            			V184.437C503.441,193.569,493.927,201.854,483.072,209.275z\" />\n            </svg>\n        </div>\n        <div class=\"item email\" onclick=\"window.location.href='mailto:iiimosley@gmail.com';\">\n            <p>iiimosley@gmail.com</p>\n        </div>\n        <div class=\"item linkedin\" onclick=\"window.open('https://www.linkedin.com/in/trey-mosley/')\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 438.536 438.536\" style=\"enable-background:new 0 0 438.536 438.536;\"\n                xml:space=\"preserve\">\n                <path d=\"M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123\n                		C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126\n                		h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225\n                		C438.532,59.576,430.49,40.204,414.41,24.123z M133.618,367.157H67.666V169.016h65.952V367.157z M127.626,132.332\n                		c-6.851,6.567-15.893,9.851-27.124,9.851h-0.288c-10.848,0-19.648-3.284-26.407-9.851c-6.76-6.567-10.138-14.703-10.138-24.41\n                		c0-9.897,3.476-18.083,10.421-24.556c6.95-6.471,15.942-9.708,26.98-9.708c11.039,0,19.89,3.237,26.553,9.708\n                		c6.661,6.473,10.088,14.659,10.277,24.556C137.899,117.625,134.477,125.761,127.626,132.332z M370.873,367.157h-65.952v-105.92\n                		c0-29.879-11.036-44.823-33.116-44.823c-8.374,0-15.42,2.331-21.128,6.995c-5.715,4.661-9.996,10.324-12.847,16.991\n                		c-1.335,3.422-1.999,8.75-1.999,15.981v110.775h-65.952c0.571-119.529,0.571-185.579,0-198.142h65.952v27.974\n                		c13.867-21.681,33.558-32.544,59.101-32.544c22.84,0,41.21,7.52,55.104,22.554c13.895,15.037,20.841,37.214,20.841,66.519v113.64\n                		H370.873z\" />\n            </svg>\n        </div>\n        <div class=\"item linkedin\" onclick=\"window.open('https://www.linkedin.com/in/iiimosley/')\">\n            <p>LinkedIn\n                <span class=\"handle\">in/iiimosley</span>\n            </p>\n        </div>\n        <div class=\"item github\" onclick=\"window.open('https://github.com/iiimosley')\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 438.536 438.536\" style=\"enable-background:new 0 0 438.536 438.536;\"\n                xml:space=\"preserve\">\n                <path d=\"M158.173,352.599c-3.049,0.568-4.381,1.999-3.999,4.281c0.38,2.283,2.093,3.046,5.138,2.283\n                			c3.049-0.76,4.38-2.095,3.997-3.997C162.931,353.074,161.218,352.216,158.173,352.599z\" />\n                <path d=\"M141.898,354.885c-3.046,0-4.568,1.041-4.568,3.139c0,2.474,1.619,3.518,4.853,3.138c3.046,0,4.57-1.047,4.57-3.138\n                			C146.753,355.553,145.134,354.502,141.898,354.885z\" />\n                <path d=\"M119.629,354.022c-0.76,2.095,0.478,3.519,3.711,4.284c2.855,1.137,4.664,0.568,5.424-1.714\n                			c0.572-2.091-0.666-3.61-3.711-4.568C122.197,351.265,120.39,351.922,119.629,354.022z\" />\n                <path d=\"M414.41,24.123C398.326,8.042,378.964,0,356.309,0H82.225C59.577,0,40.208,8.042,24.123,24.123\n                			C8.042,40.207,0,59.576,0,82.225v274.088c0,22.65,8.042,42.017,24.123,58.098c16.084,16.084,35.454,24.126,58.102,24.126h63.953\n                			c4.184,0,7.327-0.144,9.42-0.424c2.092-0.288,4.184-1.526,6.279-3.717c2.096-2.187,3.14-5.376,3.14-9.562\n                			c0-0.568-0.05-7.046-0.144-19.417c-0.097-12.375-0.144-22.176-0.144-29.41l-6.567,1.143c-4.187,0.76-9.469,1.095-15.846,0.999\n                			c-6.374-0.096-12.99-0.76-19.841-1.998c-6.855-1.239-13.229-4.093-19.13-8.562c-5.898-4.477-10.085-10.328-12.56-17.559\n                			l-2.856-6.571c-1.903-4.373-4.899-9.229-8.992-14.554c-4.093-5.332-8.232-8.949-12.419-10.852l-1.999-1.428\n                			c-1.331-0.951-2.568-2.098-3.711-3.429c-1.141-1.335-1.997-2.669-2.568-3.997c-0.571-1.335-0.097-2.43,1.427-3.289\n                			c1.524-0.855,4.281-1.279,8.28-1.279l5.708,0.855c3.808,0.76,8.516,3.042,14.134,6.851c5.614,3.806,10.229,8.754,13.846,14.843\n                			c4.38,7.806,9.657,13.75,15.846,17.843c6.184,4.097,12.419,6.143,18.699,6.143s11.704-0.476,16.274-1.424\n                			c4.565-0.954,8.848-2.385,12.847-4.288c1.713-12.751,6.377-22.559,13.988-29.41c-10.848-1.143-20.602-2.854-29.265-5.14\n                			c-8.658-2.286-17.605-5.995-26.835-11.136c-9.234-5.14-16.894-11.512-22.985-19.13c-6.09-7.618-11.088-17.61-14.987-29.978\n                			c-3.901-12.375-5.852-26.652-5.852-42.829c0-23.029,7.521-42.637,22.557-58.814c-7.044-17.32-6.379-36.732,1.997-58.242\n                			c5.52-1.714,13.706-0.428,24.554,3.855c10.85,4.286,18.794,7.951,23.84,10.992c5.046,3.042,9.089,5.614,12.135,7.71\n                			c17.705-4.949,35.976-7.423,54.818-7.423c18.841,0,37.115,2.474,54.821,7.423l10.849-6.852c7.426-4.57,16.18-8.757,26.269-12.562\n                			c10.088-3.806,17.795-4.854,23.127-3.14c8.562,21.51,9.328,40.922,2.279,58.241c15.036,16.179,22.559,35.786,22.559,58.815\n                			c0,16.18-1.951,30.505-5.852,42.969c-3.898,12.467-8.939,22.463-15.13,29.981c-6.184,7.519-13.894,13.843-23.124,18.986\n                			c-9.232,5.137-18.178,8.853-26.84,11.132c-8.661,2.286-18.414,4.004-29.263,5.147c9.891,8.562,14.839,22.072,14.839,40.538v68.238\n                			c0,3.237,0.472,5.852,1.424,7.851c0.958,1.998,2.478,3.374,4.571,4.141c2.102,0.76,3.949,1.235,5.571,1.424\n                			c1.622,0.191,3.949,0.287,6.995,0.287h63.953c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102\n                			V82.225C438.533,59.576,430.491,40.204,414.41,24.123z\" />\n                <path d=\"M86.793,319.195c-1.331,0.948-1.141,2.471,0.572,4.565c1.906,1.902,3.427,2.189,4.57,0.855\n                			c1.331-0.948,1.141-2.471-0.575-4.569C89.458,318.336,87.936,318.049,86.793,319.195z\" />\n                <path d=\"M77.374,312.057c-0.57,1.335,0.096,2.478,1.999,3.426c1.521,0.955,2.762,0.767,3.711-0.568\n                			c0.57-1.335-0.096-2.478-1.999-3.433C79.182,310.91,77.945,311.102,77.374,312.057z\" />\n                <path d=\"M95.646,330.331c-1.715,0.948-1.715,2.666,0,5.137c1.713,2.478,3.328,3.142,4.853,1.998c1.714-1.334,1.714-3.142,0-5.427\n                			C98.978,329.571,97.359,328.993,95.646,330.331z\" />\n                <path d=\"M105.641,343.174c-1.714,1.526-1.336,3.327,1.142,5.428c2.281,2.279,4.185,2.566,5.708,0.849\n                			c1.524-1.519,1.143-3.326-1.142-5.42C109.068,341.751,107.164,341.463,105.641,343.174z\" />\n            </svg>\n        </div>\n        <div class=\"item github\" onclick=\"window.open('https://github.com/iiimosley')\">\n            <p>GitHub\n                <span class=\"handle\">iiimosley</span>\n            </p>\n        </div>\n    </div>\n    <div id=\"mobileContact\">\n        <div id=\"contactFlex\">\n            <div class=\"mobileIcon\" onclick=\"window.location.href='mailto:iiimosley@gmail.com';\">\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 511.626 511.626\" style=\"enable-background:new 0 0 511.626 511.626;\"\n                    xml:space=\"preserve\">\n                    <path d=\"M49.106,178.729c6.472,4.567,25.981,18.131,58.528,40.685c32.548,22.554,57.482,39.92,74.803,52.099\n                                    c1.903,1.335,5.946,4.237,12.131,8.71c6.186,4.476,11.326,8.093,15.416,10.852c4.093,2.758,9.041,5.852,14.849,9.277\n                                    c5.806,3.422,11.279,5.996,16.418,7.7c5.14,1.718,9.898,2.569,14.275,2.569h0.287h0.288c4.377,0,9.137-0.852,14.277-2.569\n                                    c5.137-1.704,10.615-4.281,16.416-7.7c5.804-3.429,10.752-6.52,14.845-9.277c4.093-2.759,9.229-6.376,15.417-10.852\n                                    c6.184-4.477,10.232-7.375,12.135-8.71c17.508-12.179,62.051-43.11,133.615-92.79c13.894-9.703,25.502-21.411,34.827-35.116\n                                    c9.332-13.699,13.993-28.07,13.993-43.105c0-12.564-4.523-23.319-13.565-32.264c-9.041-8.947-19.749-13.418-32.117-13.418H45.679\n                                    c-14.655,0-25.933,4.948-33.832,14.844C3.949,79.562,0,91.934,0,106.779c0,11.991,5.236,24.985,15.703,38.974\n                                    C26.169,159.743,37.307,170.736,49.106,178.729z\" />\n                    <path d=\"M483.072,209.275c-62.424,42.251-109.824,75.087-142.177,98.501c-10.849,7.991-19.65,14.229-26.409,18.699\n                                    c-6.759,4.473-15.748,9.041-26.98,13.702c-11.228,4.668-21.692,6.995-31.401,6.995h-0.291h-0.287\n                                    c-9.707,0-20.177-2.327-31.405-6.995c-11.228-4.661-20.223-9.229-26.98-13.702c-6.755-4.47-15.559-10.708-26.407-18.699\n                                    c-25.697-18.842-72.995-51.68-141.896-98.501C17.987,202.047,8.375,193.762,0,184.437v226.685c0,12.57,4.471,23.319,13.418,32.265\n                                    c8.945,8.949,19.701,13.422,32.264,13.422h420.266c12.56,0,23.315-4.473,32.261-13.422c8.949-8.949,13.418-19.694,13.418-32.265\n                                    V184.437C503.441,193.569,493.927,201.854,483.072,209.275z\" />\n                </svg>\n            </div>\n            <div class=\"mobileIcon\" onclick=\"window.open('https://www.linkedin.com/in/iiimosley/')\">\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 438.536 438.536\" style=\"enable-background:new 0 0 438.536 438.536;\"\n                    xml:space=\"preserve\">\n                    <path d=\"M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123\n                                    C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126\n                                    h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225\n                                    C438.532,59.576,430.49,40.204,414.41,24.123z M133.618,367.157H67.666V169.016h65.952V367.157z M127.626,132.332\n                                    c-6.851,6.567-15.893,9.851-27.124,9.851h-0.288c-10.848,0-19.648-3.284-26.407-9.851c-6.76-6.567-10.138-14.703-10.138-24.41\n                                    c0-9.897,3.476-18.083,10.421-24.556c6.95-6.471,15.942-9.708,26.98-9.708c11.039,0,19.89,3.237,26.553,9.708\n                                    c6.661,6.473,10.088,14.659,10.277,24.556C137.899,117.625,134.477,125.761,127.626,132.332z M370.873,367.157h-65.952v-105.92\n                                    c0-29.879-11.036-44.823-33.116-44.823c-8.374,0-15.42,2.331-21.128,6.995c-5.715,4.661-9.996,10.324-12.847,16.991\n                                    c-1.335,3.422-1.999,8.75-1.999,15.981v110.775h-65.952c0.571-119.529,0.571-185.579,0-198.142h65.952v27.974\n                                    c13.867-21.681,33.558-32.544,59.101-32.544c22.84,0,41.21,7.52,55.104,22.554c13.895,15.037,20.841,37.214,20.841,66.519v113.64\n                                    H370.873z\" />\n                </svg>\n            </div>\n            <div class=\"mobileIcon\" onclick=\"window.open('https://github.com/iiimosley')\">\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 438.536 438.536\" style=\"enable-background:new 0 0 438.536 438.536;\"\n                    xml:space=\"preserve\">\n                    <path d=\"M158.173,352.599c-3.049,0.568-4.381,1.999-3.999,4.281c0.38,2.283,2.093,3.046,5.138,2.283\n                                        c3.049-0.76,4.38-2.095,3.997-3.997C162.931,353.074,161.218,352.216,158.173,352.599z\" />\n                    <path d=\"M141.898,354.885c-3.046,0-4.568,1.041-4.568,3.139c0,2.474,1.619,3.518,4.853,3.138c3.046,0,4.57-1.047,4.57-3.138\n                                        C146.753,355.553,145.134,354.502,141.898,354.885z\" />\n                    <path d=\"M119.629,354.022c-0.76,2.095,0.478,3.519,3.711,4.284c2.855,1.137,4.664,0.568,5.424-1.714\n                                        c0.572-2.091-0.666-3.61-3.711-4.568C122.197,351.265,120.39,351.922,119.629,354.022z\" />\n                    <path d=\"M414.41,24.123C398.326,8.042,378.964,0,356.309,0H82.225C59.577,0,40.208,8.042,24.123,24.123\n                                        C8.042,40.207,0,59.576,0,82.225v274.088c0,22.65,8.042,42.017,24.123,58.098c16.084,16.084,35.454,24.126,58.102,24.126h63.953\n                                        c4.184,0,7.327-0.144,9.42-0.424c2.092-0.288,4.184-1.526,6.279-3.717c2.096-2.187,3.14-5.376,3.14-9.562\n                                        c0-0.568-0.05-7.046-0.144-19.417c-0.097-12.375-0.144-22.176-0.144-29.41l-6.567,1.143c-4.187,0.76-9.469,1.095-15.846,0.999\n                                        c-6.374-0.096-12.99-0.76-19.841-1.998c-6.855-1.239-13.229-4.093-19.13-8.562c-5.898-4.477-10.085-10.328-12.56-17.559\n                                        l-2.856-6.571c-1.903-4.373-4.899-9.229-8.992-14.554c-4.093-5.332-8.232-8.949-12.419-10.852l-1.999-1.428\n                                        c-1.331-0.951-2.568-2.098-3.711-3.429c-1.141-1.335-1.997-2.669-2.568-3.997c-0.571-1.335-0.097-2.43,1.427-3.289\n                                        c1.524-0.855,4.281-1.279,8.28-1.279l5.708,0.855c3.808,0.76,8.516,3.042,14.134,6.851c5.614,3.806,10.229,8.754,13.846,14.843\n                                        c4.38,7.806,9.657,13.75,15.846,17.843c6.184,4.097,12.419,6.143,18.699,6.143s11.704-0.476,16.274-1.424\n                                        c4.565-0.954,8.848-2.385,12.847-4.288c1.713-12.751,6.377-22.559,13.988-29.41c-10.848-1.143-20.602-2.854-29.265-5.14\n                                        c-8.658-2.286-17.605-5.995-26.835-11.136c-9.234-5.14-16.894-11.512-22.985-19.13c-6.09-7.618-11.088-17.61-14.987-29.978\n                                        c-3.901-12.375-5.852-26.652-5.852-42.829c0-23.029,7.521-42.637,22.557-58.814c-7.044-17.32-6.379-36.732,1.997-58.242\n                                        c5.52-1.714,13.706-0.428,24.554,3.855c10.85,4.286,18.794,7.951,23.84,10.992c5.046,3.042,9.089,5.614,12.135,7.71\n                                        c17.705-4.949,35.976-7.423,54.818-7.423c18.841,0,37.115,2.474,54.821,7.423l10.849-6.852c7.426-4.57,16.18-8.757,26.269-12.562\n                                        c10.088-3.806,17.795-4.854,23.127-3.14c8.562,21.51,9.328,40.922,2.279,58.241c15.036,16.179,22.559,35.786,22.559,58.815\n                                        c0,16.18-1.951,30.505-5.852,42.969c-3.898,12.467-8.939,22.463-15.13,29.981c-6.184,7.519-13.894,13.843-23.124,18.986\n                                        c-9.232,5.137-18.178,8.853-26.84,11.132c-8.661,2.286-18.414,4.004-29.263,5.147c9.891,8.562,14.839,22.072,14.839,40.538v68.238\n                                        c0,3.237,0.472,5.852,1.424,7.851c0.958,1.998,2.478,3.374,4.571,4.141c2.102,0.76,3.949,1.235,5.571,1.424\n                                        c1.622,0.191,3.949,0.287,6.995,0.287h63.953c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102\n                                        V82.225C438.533,59.576,430.491,40.204,414.41,24.123z\" />\n                    <path d=\"M86.793,319.195c-1.331,0.948-1.141,2.471,0.572,4.565c1.906,1.902,3.427,2.189,4.57,0.855\n                                        c1.331-0.948,1.141-2.471-0.575-4.569C89.458,318.336,87.936,318.049,86.793,319.195z\" />\n                    <path d=\"M77.374,312.057c-0.57,1.335,0.096,2.478,1.999,3.426c1.521,0.955,2.762,0.767,3.711-0.568\n                                        c0.57-1.335-0.096-2.478-1.999-3.433C79.182,310.91,77.945,311.102,77.374,312.057z\" />\n                    <path d=\"M95.646,330.331c-1.715,0.948-1.715,2.666,0,5.137c1.713,2.478,3.328,3.142,4.853,1.998c1.714-1.334,1.714-3.142,0-5.427\n                                        C98.978,329.571,97.359,328.993,95.646,330.331z\" />\n                    <path d=\"M105.641,343.174c-1.714,1.526-1.336,3.327,1.142,5.428c2.281,2.279,4.185,2.566,5.708,0.849\n                                        c1.524-1.519,1.143-3.326-1.142-5.42C109.068,341.751,107.164,341.463,105.641,343.174z\" />\n                </svg>\n            </div>\n        </div>\n    </div>\n</main>\n    <footer>\n        <p id=\"iconCredit\">icons made by\n            <a href=\"https://www.flaticon.com/authors/dave-gandy\">Dave Gandy</a> from www.flaticon.com </p>\n    </footer>";
},"useData":true});

},{"hbsfy/runtime":25}],29:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"homeWrap\">\n    <div id=\"obStrat\">\n        <h2>Oblique Strategy <span id=\"obLink\">\n            <a href=\"https://en.wikipedia.org/wiki/Oblique_Strategies\" target=\"_blank\">&deg;</a>\n        </span><span id=\"cardNum\">#"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":35},"end":{"line":5,"column":41}}}) : helper)))
    + "</span></h2>\n        <div id=\"obCard\">\n        <p>"
    + alias4(((helper = (helper = helpers.strategy || (depth0 != null ? depth0.strategy : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"strategy","hash":{},"data":data,"loc":{"start":{"line":7,"column":11},"end":{"line":7,"column":23}}}) : helper)))
    + "</p>\n        </div>\n    </div>\n    <div id=\"obFooter\">Oblique Strategies API courtesy of <a href=\"https://github.com/amonks/\">Andrew Monks</a></footer>\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":25}],30:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"workWrap\">\n    <div class=\"workImage\">\n        <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":6,"column":18},"end":{"line":6,"column":27}}}) : helper)))
    + "\"/>\n    </div>\n    <div class=\"workContent\">\n        <h2>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":9,"column":21}}}) : helper)))
    + "</h2>\n        <h4>"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":10,"column":24}}}) : helper)))
    + "</h4>\n        <p class=\"workBrief\">"
    + ((stack1 = ((helper = (helper = helpers.brief || (depth0 != null ? depth0.brief : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"brief","hash":{},"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":40}}}) : helper))) != null ? stack1 : "")
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.link : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":8},"end":{"line":14,"column":15}}})) != null ? stack1 : "")
    + "        <div><a href=\""
    + alias4(((helper = (helper = helpers.repo || (depth0 != null ? depth0.repo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"repo","hash":{},"data":data,"loc":{"start":{"line":15,"column":22},"end":{"line":15,"column":30}}}) : helper)))
    + "\" target=\"_blank\">Github Repository</a></div>\n    </div>\n    <div class=\"workClear\"></div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div><a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":13,"column":22},"end":{"line":13,"column":30}}}) : helper)))
    + "\" target=\"_blank\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":13,"column":48},"end":{"line":13,"column":57}}}) : helper)))
    + "</a></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1>Collected Works</h1>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":19,"column":9}}})) != null ? stack1 : "")
    + "\n<div id=\"workRef\">\n    <div id=\"workRefLogo\" onclick=\"window.open('https://github.com/iiimosley')\">\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 438.536 438.536\"\n                    style=\"enable-background:new 0 0 438.536 438.536;\" xml:space=\"preserve\">\n                    <path d=\"M158.173,352.599c-3.049,0.568-4.381,1.999-3.999,4.281c0.38,2.283,2.093,3.046,5.138,2.283\n                                                        c3.049-0.76,4.38-2.095,3.997-3.997C162.931,353.074,161.218,352.216,158.173,352.599z\"\n                    />\n                    <path d=\"M141.898,354.885c-3.046,0-4.568,1.041-4.568,3.139c0,2.474,1.619,3.518,4.853,3.138c3.046,0,4.57-1.047,4.57-3.138\n                                                        C146.753,355.553,145.134,354.502,141.898,354.885z\" />\n                    <path d=\"M119.629,354.022c-0.76,2.095,0.478,3.519,3.711,4.284c2.855,1.137,4.664,0.568,5.424-1.714\n                                                        c0.572-2.091-0.666-3.61-3.711-4.568C122.197,351.265,120.39,351.922,119.629,354.022z\"\n                    />\n                    <path d=\"M414.41,24.123C398.326,8.042,378.964,0,356.309,0H82.225C59.577,0,40.208,8.042,24.123,24.123\n                                                        C8.042,40.207,0,59.576,0,82.225v274.088c0,22.65,8.042,42.017,24.123,58.098c16.084,16.084,35.454,24.126,58.102,24.126h63.953\n                                                        c4.184,0,7.327-0.144,9.42-0.424c2.092-0.288,4.184-1.526,6.279-3.717c2.096-2.187,3.14-5.376,3.14-9.562\n                                                        c0-0.568-0.05-7.046-0.144-19.417c-0.097-12.375-0.144-22.176-0.144-29.41l-6.567,1.143c-4.187,0.76-9.469,1.095-15.846,0.999\n                                                        c-6.374-0.096-12.99-0.76-19.841-1.998c-6.855-1.239-13.229-4.093-19.13-8.562c-5.898-4.477-10.085-10.328-12.56-17.559\n                                                        l-2.856-6.571c-1.903-4.373-4.899-9.229-8.992-14.554c-4.093-5.332-8.232-8.949-12.419-10.852l-1.999-1.428\n                                                        c-1.331-0.951-2.568-2.098-3.711-3.429c-1.141-1.335-1.997-2.669-2.568-3.997c-0.571-1.335-0.097-2.43,1.427-3.289\n                                                        c1.524-0.855,4.281-1.279,8.28-1.279l5.708,0.855c3.808,0.76,8.516,3.042,14.134,6.851c5.614,3.806,10.229,8.754,13.846,14.843\n                                                        c4.38,7.806,9.657,13.75,15.846,17.843c6.184,4.097,12.419,6.143,18.699,6.143s11.704-0.476,16.274-1.424\n                                                        c4.565-0.954,8.848-2.385,12.847-4.288c1.713-12.751,6.377-22.559,13.988-29.41c-10.848-1.143-20.602-2.854-29.265-5.14\n                                                        c-8.658-2.286-17.605-5.995-26.835-11.136c-9.234-5.14-16.894-11.512-22.985-19.13c-6.09-7.618-11.088-17.61-14.987-29.978\n                                                        c-3.901-12.375-5.852-26.652-5.852-42.829c0-23.029,7.521-42.637,22.557-58.814c-7.044-17.32-6.379-36.732,1.997-58.242\n                                                        c5.52-1.714,13.706-0.428,24.554,3.855c10.85,4.286,18.794,7.951,23.84,10.992c5.046,3.042,9.089,5.614,12.135,7.71\n                                                        c17.705-4.949,35.976-7.423,54.818-7.423c18.841,0,37.115,2.474,54.821,7.423l10.849-6.852c7.426-4.57,16.18-8.757,26.269-12.562\n                                                        c10.088-3.806,17.795-4.854,23.127-3.14c8.562,21.51,9.328,40.922,2.279,58.241c15.036,16.179,22.559,35.786,22.559,58.815\n                                                        c0,16.18-1.951,30.505-5.852,42.969c-3.898,12.467-8.939,22.463-15.13,29.981c-6.184,7.519-13.894,13.843-23.124,18.986\n                                                        c-9.232,5.137-18.178,8.853-26.84,11.132c-8.661,2.286-18.414,4.004-29.263,5.147c9.891,8.562,14.839,22.072,14.839,40.538v68.238\n                                                        c0,3.237,0.472,5.852,1.424,7.851c0.958,1.998,2.478,3.374,4.571,4.141c2.102,0.76,3.949,1.235,5.571,1.424\n                                                        c1.622,0.191,3.949,0.287,6.995,0.287h63.953c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102\n                                                        V82.225C438.533,59.576,430.491,40.204,414.41,24.123z\" />\n                    <path d=\"M86.793,319.195c-1.331,0.948-1.141,2.471,0.572,4.565c1.906,1.902,3.427,2.189,4.57,0.855\n                                                        c1.331-0.948,1.141-2.471-0.575-4.569C89.458,318.336,87.936,318.049,86.793,319.195z\"\n                    />\n                    <path d=\"M77.374,312.057c-0.57,1.335,0.096,2.478,1.999,3.426c1.521,0.955,2.762,0.767,3.711-0.568\n                                                        c0.57-1.335-0.096-2.478-1.999-3.433C79.182,310.91,77.945,311.102,77.374,312.057z\"\n                    />\n                    <path d=\"M95.646,330.331c-1.715,0.948-1.715,2.666,0,5.137c1.713,2.478,3.328,3.142,4.853,1.998c1.714-1.334,1.714-3.142,0-5.427\n                                                        C98.978,329.571,97.359,328.993,95.646,330.331z\" />\n                    <path d=\"M105.641,343.174c-1.714,1.526-1.336,3.327,1.142,5.428c2.281,2.279,4.185,2.566,5.708,0.849\n                                                        c1.524-1.519,1.143-3.326-1.142-5.42C109.068,341.751,107.164,341.463,105.641,343.174z\"\n                    />\n                </svg>\n    </div>\n    <div id=\"workDirect\">\n        To review further works completed:<br/>\n        Please visit my GitHub\n    </div>\n    <div class=\"workClear\"></div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":25}]},{},[1]);
