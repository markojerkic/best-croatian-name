const delta = (score: number, opponent: number, result: 0 | 1) => {
  const K = 25;
  const probability = 1 / (1 + Math.pow(10, (opponent - score) / 400));
  return Math.round(K * (result - probability));
};

const newScore = (score: number, opponent: number, result: 0 | 1) => {
  return score + delta(score, opponent, result);
};

export default newScore;
