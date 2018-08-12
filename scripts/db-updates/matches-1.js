const mongoose = require('mongoose');
const models = require('../../backend/src/models');
mongoose.connect('mongodb://localhost/pingwin');
const Match = require('mongoose').model('Match');

Match.find({}).then(matches => {
  return Promise.all(matches.map(match => {
    const matchObj = match.toObject();
    let newPlayer1 = {
      username: matchObj.player1.username,
      newRating: matchObj.player1.rating,
      ratingDiff: matchObj.player1.ratingGain
    };
    let newPlayer2 = {
      username: matchObj.player2.username,
      newRating: matchObj.player2.rating,
      ratingDiff: matchObj.player2.ratingGain
    };
    if (matchObj.winner) {
      if (matchObj.player1.username === matchObj.winner) {
        newPlayer1.winner = true;
      } else {
        newPlayer2.winner = true;
      }
      match.set('player1', newPlayer1);
      match.set('player2', newPlayer2);
      match.set('createdAt', matchObj.date)
      return match.save();
    } else {
      return Promise.resolve();
    }
  }));
}).then(() => {
  return Match.collection.update({},
    {
      $unset: {
        winner: '',
        date: ''
      }
    },
    {multi: true, safe: true});
}).then(() => {
  process.exit(1);
});
