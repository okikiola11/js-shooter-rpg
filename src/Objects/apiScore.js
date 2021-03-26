const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const key = 'ChF4TmQGD4utdKukv7M8';

const getScores = async () => {
  const response = await fetch(`${baseURL}/games/${key}/scores`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Error');
};

const postScores = async (name, score) => {
  const response = await fetch(`${baseURL}/games/${key}/scores`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score: Number(score),
      }),
    });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Error!');
};

export { getScores, postScores };