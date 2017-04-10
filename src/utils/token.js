const tokenKey = 'profileMakerToken';

export const getToken = () => window.localStorage.getItem(tokenKey);
export const setToken = token => window.localStorage.setItem(tokenKey, token);
export const clearToken = () => window.localStorage.removeItem(tokenKey);
