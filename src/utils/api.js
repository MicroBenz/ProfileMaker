import { getToken } from './token';

const apiEndpoint = 'http://localhost:3000/api';

export const get = path => fetch(`${apiEndpoint}/${path}`, {
  method: 'GET',
  headers: {
    'x-access-token': `Bearer ${getToken()}`,
  },
});

export const post = (path, body) => fetch(`${apiEndpoint}/${path}`, {
  method: 'POST',
  headers: {
    'x-access-token': `Bearer ${getToken()}`,
  },
  body,
});
