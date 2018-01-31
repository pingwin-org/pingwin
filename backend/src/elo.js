'use strict';

// The k-factor is a constant used for determining how much rating can fluctuate
// this is the highest value one can gain/lose in a single match (disregarding boost)
// for evenly matched players the gain is roughly equal to half the k-factor
const kfactor = 32;

function match(winner, loser) {
  const prob = probabilityOfWinning(winner, loser);

  const winnerGain = Math.round((1 - prob) * boost(winner) * kfactor);
  const loserGain = -Math.round((1 - prob) * boost(loser) * kfactor);

  return { winnerGain, loserGain };
}

function probabilityOfWinning(p1, p2) {
  const diff = p1.rating - p2.rating;
  const probability = 1 / (1 + Math.pow(10, -diff/400));

  const pretty = Math.round(probability*1000)/10;
  console.log('probability %s win over %s = %d%%', p1.username, p2.username, pretty);

  return probability;
}

// boost function to make new players elo adapt quicker
function boost(p) {
  if (p.matches < 10) {
    return 2;
  } else {
    return 1;
  }
}

module.exports = match;
