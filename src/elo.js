'use strict';

// TODO: clean up
// TODO: better maths

// replace with k-value
const stake = 10;

function match(winner, loser) {
  console.log();
  var winnerOldRating = winner.rating;
  var loserOldRating = loser.rating;

  var winnerGain = Math.round(
    (1 - probabilityOfWinning(winner, loser)) * boost(winner) * stake);
  var loserLoss = Math.round(
    probabilityOfWinning(loser, winner) * boost(loser) * stake);

  winner.rating += Math.round(winnerGain);
  loser.rating -= Math.round(loserLoss);

  console.log(winner.name, winnerOldRating, '+', winnerGain, '=', winner.rating);
  console.log(loser.name, loserOldRating, '-', loserLoss, '=', loser.rating);

  winner.matches++;
  loser.matches++;

  return {
    winnerGain: winnerGain,
    loserGain: -loserLoss
  }
}

function probabilityOfWinning(p1, p2) {
  var ratingDiff = p1.rating - p2.rating;
  var probability = 1 / (1 + Math.pow(10, -ratingDiff/500));
  console.log('probability', p1.name, 'win over', p2.name, '=', probability);
  return probability;
}

function boost(p) {
  if (p.matches < 5) {
    return 2;
  } else {
    return 1;
  }
}

module.exports = match;
