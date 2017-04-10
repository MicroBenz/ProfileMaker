import actionCreator, { promiseStates } from '../utils/actionCreator';

const authConstants = actionCreator.defineAction('auth');

const SET_LOGIN_STATE = authConstants.defineAction('SET_LOGIN_STATE');

const initialState = {
  isLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: {
      return {
        ...state,
        isLogin: action.isLogin,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setLogin: isLogin => ({
    type: SET_LOGIN_STATE,
    isLogin,
  }),
};
