'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MatchSchema = new mongoose.Schema({
  player1: {
    username: {
      type: String,
      required: true
    },
    rating: Number,
    ratingGain: Number
  },
  player2: {
    username: {
      type: String,
      required: true
    },
    rating: Number,
    ratingGain: Number
  },
  date: {
    type: Date,
    default: Date.now()
  },
  winner: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Match', MatchSchema);
