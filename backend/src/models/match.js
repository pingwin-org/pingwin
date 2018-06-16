'use strict';

const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  newRating: Number,
  ratingDiff: Number,
  winner: Boolean
}, {
  _id: false
});

const MatchSchema = new mongoose.Schema({
  player1: {
    type: PlayerSchema,
    required: true
  },
  player2: {
    type: PlayerSchema,
    required: true
  }
}, {
  timestamps: true
});

MatchSchema.pre('validate', function (next) {
  if (this.player1.winner && this.player2.winner) return next(new Error('Everybody wins. NOT!!'));
  next();
});

module.exports = mongoose.model('Match', MatchSchema);
