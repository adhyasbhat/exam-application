const calculateScore = (responses) => {
    let score = 0;
  responses.forEach(response => {
    if (response.answer === response.correctAnswer) {
      score += 1;
    }
  });
  return score;
  };
module.exports = calculateScore;