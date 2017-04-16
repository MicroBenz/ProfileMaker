import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as authActions } from '../../store/auth';
import { loginWithFB } from '../../utils/auth';

@connect(
  () => ({}),
  dispatch => ({
    setLogin(token) {
      dispatch(authActions.setLoginSuccess(token));
    },
    getUser(token) {
      dispatch(authActions.getUser(token));
    },
  }),
)
export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.handleOnLoginWithFB = this.handleOnLoginWithFB.bind(this);
  }

  handleOnLoginWithFB() {
    console.log('press login with fb come at login button component');
    FB.login(async (fbResponse) => {
      if (fbResponse.authResponse) {
        console.log('user logged in', fbResponse);
        const { accessToken } = fbResponse.authResponse;
        const { token } = await loginWithFB(accessToken);
        this.props.setLogin(token);
        this.props.getUser(token);
      }
      else {
        console.log('not log in');
      }
    });
  }

  render() {
    return (
      <a className="button is-info" onClick={this.handleOnLoginWithFB}>
        <span className="icon">
          <span className="icon">
            <i className="fa fa-facebook" />
          </span>
        </span>
        <span>Login with Facebook</span>
      </a>
    );
  }
}
