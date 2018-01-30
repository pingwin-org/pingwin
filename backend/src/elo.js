'use strict';

// replace with k-value
const stake = 10;

function match(winner, loser) {
  const prob = probabilityOfWinning(winner, loser);
  const winnerGain = Math.round((1 - prob) * boost(winner) * stake);
  const loserGain = -Math.round((1 - prob) * boost(loser) * stake);

  return { winnerGain, loserGain };
}

function probabilityOfWinning(p1, p2) {
  const diff = p1.rating - p2.rating;
  const probability = 1 / (1 + Math.pow(10, -diff/500));

  const pretty = Math.round(probability*1000)/10;
  console.log('probability %s win over %s = %d%%', p1.username, p2.username, pretty);

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
