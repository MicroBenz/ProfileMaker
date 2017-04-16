const apiEndpoint = 'http://localhost:3000/api';
const fbLoginEndpoint = '/auth/facebook/login';

export const loginWithFB = fbAccessToken => (
  fetch(`${apiEndpoint}${fbLoginEndpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${fbAccessToken}`,
    },
  }).then(res => res.json())
);
