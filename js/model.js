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
