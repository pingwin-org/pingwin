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
  matches: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  pin: {
    type: Number,
    min: 0,
    max: 9999,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
