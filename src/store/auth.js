import actionCreator, { promiseStates } from '../utils/actionCreator';
import { setToken, clearToken } from '../utils/token';

const authConstants = actionCreator.defineAction('auth');

const LOGIN_SUCCEED = authConstants.defineAction('LOGIN_SUCCEED');
const NON_LOGIN = authConstants.defineAction('NON_LOGIN');
const GET_USER = authConstants.defineAction('MAKE_LOGIN', promiseStates);

const initialState = {
  isCompleteAuthFlow: false,
  isLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCEED: {
      setToken(action.appsToken);
      return {
        ...state,
        isLogin: true,
        isCompleteAuthFlow: true,
      };
    }
    case NON_LOGIN: {
      clearToken();
      return {
        ...state,
        isLogin: false,
        isCompleteAuthFlow: true,
      };
    }
    case GET_USER.PENDING: {
      return state;
    }
    case GET_USER.RESOLVED: {
      return {
        ...state,
        user: action.data,
      };
    }
    case GET_USER.REJECTED: {
      return state;
    }
    default:
      return state;
  }
};

export const actions = {
  setLoginSuccess: appsToken => ({
    type: LOGIN_SUCCEED,
    appsToken,
  }),
  setNonLogin: () => ({
    type: NON_LOGIN,
  }),
  getUser: appsToken => ({
    type: GET_USER,
    promise: fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'x-access-token': `Bearer ${appsToken}`,
      },
    }).then(response => response.json()),
  }),
};
