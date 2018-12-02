'use strict';

const matches = require('express').Router();
const Match = require('mongoose').model('Match');
const User = require('mongoose').model('User');

const elo = require('../elo');
const socketio = require('../socket-io');

matches.get('/', async function (req, res) {
  const matches = await Match.find({}).exec();
  res.send(matches);
});

matches.post('/', async function (req, res) {
  try {
    const winner = await User.findOne({username: req.body.winner}).exec();
    const loser = await User.findOne({username: req.body.loser}).exec();

    if (!winner) {
      return res.status(400).send('Winner not found');
    }

    if (!loser) {
      return res.status(400).send('Loser not found');
    }

    if (winner === loser) {
      return res.status(400).send('Winner and loser can\'t be the same');
    }

    const gains = elo(winner, loser);
    winner.rating += gains.winnerGain;
    loser.rating += gains.loserGain;
    winner.matches++;
    loser.matches++;
    winner.wins++;
    loser.losses++;

    await winner.save();
    await loser.save();

    const newMatch = {
      player1: {
        username: winner.username,
        newRating: winner.rating,
        ratingDiff: gains.winnerGain,
        winner: true
      },
      player2: {
        username: loser.username,
        newRating: loser.rating,
        ratingDiff: gains.loserGain
      }
    };
    const match = await Match.create(newMatch);

    console.log('Added new match', newMatch);
    socketio.notifyUpdate(socketio.constants.matches.NEW, match.id);
    socketio.update(socketio.constants.users.UPDATED, winner);
    socketio.update(socketio.constants.users.UPDATED, loser);
    return res.sendStatus(200);
  } catch (e) {
    console.log('error posting match', e);
    res.status(500).send(e.message);
  }
});

module.exports = matches;
