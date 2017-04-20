import { getToken } from './token';
import configs from '../configs';

const apiEndpoint = configs.API_ENDPOINT;

export const get = path => fetch(`${apiEndpoint}${path}`, {
  method: 'GET',
  headers: {
    'x-access-token': `Bearer ${getToken()}`,
  },
}).then(res => res.json());

export const post = (path, body = {}) => fetch(`${apiEndpoint}${path}`, {
  method: 'POST',
  headers: {
    'x-access-token': `Bearer ${getToken()}`,
  },
  body,
}).then(res => res.json());
