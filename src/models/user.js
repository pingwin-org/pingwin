'use strict';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    type: Number,
    default: 1000
  },
  matches: Number,
  wins: Number,
  losses: Number,
  pin: {
    type: Number,
    min: 0,
    max: 9999,
    require: true
  }
}

module.exports = mongoose.model('User', UserSchema);
