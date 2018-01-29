'use strict';
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MatchSchema = new mongoose.Schema({
  player1: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  player2: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  date: Date,
  winner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  player1rating: Number,
  player2rating: Number,
  player1ratingChange: Number,
  player2ratingChange: Number,
});

module.exports = mongoose.model('Match', MatchSchema);
