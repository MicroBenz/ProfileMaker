import actionCreator, { promiseStates } from '../utils/actionCreator';
import { setToken, clearToken } from '../utils/token';

const authConstants = actionCreator.defineAction('auth');

const LOGIN_SUCCEED = authConstants.defineAction('LOGIN_SUCCEED');
const NON_LOGIN = authConstants.defineAction('NON_LOGIN');
const SET_LOGIN_STATE = authConstants.defineAction('SET_LOGIN_STATE');
const COMPLETED_AUTH_FLOW = authConstants.defineAction('COMPLETED_AUTH_FLOW');
const SET_APPS_TOKEN = authConstants.defineAction('SET_APPS_TOKEN');
const MAKE_LOGIN = authConstants.defineAction('MAKE_LOGIN', promiseStates);

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
    // case SET_LOGIN_STATE: {
    //   return {
    //     ...state,
    //     isLogin: action.isLogin,
    //   };
    // }
    // case COMPLETED_AUTH_FLOW: {
    //   return {
    //     ...state,
    //     isCompleteAuthFlow: true,
    //   };
    // }
    // case SET_APPS_TOKEN: {
    //   setToken(action.token);
    //   return {
    //     ...state,
    //     isLogin: true,
    //     isCompleteAuthFlow: true,
    //   };
    // }
    // case MAKE_LOGIN.PENDING: {
    //   return state;
    // }
    // case MAKE_LOGIN.RESOLVED: {
    //   const { token } = action.data;
    //   // console.log(token);
    //   return {
    //     ...state,
    //     isLogin: true,
    //     isCompleteAuthFlow: true,
    //   };
    // }
    // case MAKE_LOGIN.REJECTED: {
    //   return state;
    // }
    default:
      return state;
  }
};

export const actions = {
  // setLogin: isLogin => ({
  //   type: SET_LOGIN_STATE,
  //   isLogin,
  // }),
  // completeAuthFlow: () => ({
  //   type: COMPLETED_AUTH_FLOW,
  // }),
  setLoginSuccess: appsToken => ({
    type: LOGIN_SUCCEED,
    appsToken,
  }),
  setNonLogin: () => ({
    type: NON_LOGIN,
  }),
  // makeLogin: accessToken => ({
  //   type: MAKE_LOGIN,
  //   promise: fetch('http://localhost:3000/api/auth/facebook/login', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //   .then(response => response.json()),
  //   // .then(
  //   //   (response) => {
  //   //     console.log(response);
  //   //     if (response.ok) return response.json();
  //   //   },
  //   //   (error) => {
  //   //     console.error(error);
  //   //   },
  //   // ),
  //   // .then(
  //   //   ({ token }) => {
  //   //     setToken(token);
  //   //   },
  //   // ),
  // }),
};
