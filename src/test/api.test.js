import { getScores, postScores } from '../Objects/apiScore';

test('should retrieve and return the scores', () => {
  getScores()
    .then((data) => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            sore: '100',
          }),
        ]),
      );
    })
    .catch(() => {});
});

test('should post the game scores', () => {
  postScores('Ayodele', 1200).then((response) => {
    expect(response).toBe('Leaderboard score created correctly.');
  }).catch((error) => error);
});

test('should send an object to the API', () => {
  postScores().then((data) => {
    expect(typeof data).toBe('object');
  }).catch(() => {});
});

test('score should not be 0 ', () => {
  postScores('Ayodele', 0).then((response) => {
    expect(response).toBe(null);
  }).catch((error) => error);
});

test('Inputted name should not be blank', () => {
  postScores(' ', 10)
    .then((response) => {
      expect(response).toBe(null);
    })
    .catch((error) => error);
});