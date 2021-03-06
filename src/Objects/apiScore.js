/* eslint-disable consistent-return */

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const key = 'JEs0kzQgvvjQBRvlrgZH';

const postScores = async (name, score) => {
  const response = await fetch(`${baseURL}/games/${key}/scores`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score: Number(score) }),
  });
  if (response.status === 200) {
    return response.json();
  }
};

const getScores = async () => {
  const response = await fetch(`${baseURL}/games/${key}/scores`, {
    method: 'Get',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Error!');
};

export { getScores, postScores };