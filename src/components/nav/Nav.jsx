import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from './Nav.scss';
import { actions as authActions } from '../../store/auth';
import { clearToken, setToken } from '../../utils/token';

@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
    isCompleteAuthFlow: auth.isCompleteAuthFlow,
  }),
  dispatch => ({
    setLogout() {
      dispatch(authActions.setNonLogin());
    },
    setLogin(token) {
      dispatch(authActions.setLoginSuccess(token));
    },
  }),
)
@CSSModules(styles)
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleOnLoginWithFB = this.handleOnLoginWithFB.bind(this);
    this.handleOnLogoutWithFB = this.handleOnLogoutWithFB.bind(this);
  }

  handleOnLoginWithFB() {
    console.log('press login with fb');
    FB.login((fbResponse) => {
      if (fbResponse.authResponse) {
        console.log('user logged in', fbResponse);
        // this.props.setLogin();
        const { accessToken } = fbResponse.authResponse;
        fetch('http://localhost:3000/api/auth/facebook/login', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            console.log(response);
            if (response.ok) return response.json();
          },
          (error) => {
            console.error(error);
          },
        )
        .then(
          ({ token }) => {
            // setToken(token);
            this.props.setLogin(token);
          },
        );
      }
      else {
        console.log('not log in');
      }
    });
  }

  handleOnLogoutWithFB() {
    FB.logout(() => {
      this.props.setLogout();
      clearToken();
    });
  }

  render() {
    console.log('rerender');
    const { isLogin, isCompleteAuthFlow } = this.props;
    return (
      <nav className="nav has-shadow" styleName="nav">
        <div className="container">
          <div className="nav-left">
            <NavLink to="/" className="nav-item" styleName="branding-wrapper">
              <img src={require('./logo.png')} alt="ProfileMaker Logo" />
            </NavLink>
            <NavLink to="/explore" className="nav-item is-tab" activeClassName="is-active">Explore</NavLink>
            { isCompleteAuthFlow && isLogin &&
              <NavLink to="/create-overlay" className="nav-item is-tab" activeClassName="is-active">Create Profile Overlay</NavLink>
            }
          </div>
          <div className="nav-right">
            <div className="nav-item">
              { isCompleteAuthFlow && !isLogin &&
                <a className="button is-info" onClick={this.handleOnLoginWithFB}>
                  <span className="icon">
                    <span className="icon">
                      <i className="fa fa-facebook" />
                    </span>
                  </span>
                  <span>Login with Facebook</span>
                </a>
              }
              { isCompleteAuthFlow && isLogin &&
                <a className="button is-danger" onClick={this.handleOnLogoutWithFB}>
                  <span className="icon">
                    <span className="icon">
                      <i className="fa fa-sign-out" />
                    </span>
                  </span>
                  <span>Logout</span>
                </a>
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
