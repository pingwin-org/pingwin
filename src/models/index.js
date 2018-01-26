'use strict';
console.log('LOADING pingwin models');
const mongoose = require('mongoose');
module.exports = {
  User: require('./user'),
  Match: require('./match')
};
