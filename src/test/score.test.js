const score = require('../js/Score');

test('it returns the score value', () => {
  const prevScore = 100;
  expect(score(prevScore, 0)).toBe(100);
});

test('it increments the score by the amount player gains', () => {
  const prevScore = 100;
  expect(score(prevScore, 60)).toBe(160);
});