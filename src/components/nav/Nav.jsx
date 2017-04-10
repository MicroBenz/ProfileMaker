import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from './Nav.scss';
import { actions as authActions } from '../../store/auth';

@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
  dispatch => ({
    setLogout() {
      dispatch(authActions.setLogin(false));
    },
    setLogin() {
      dispatch(authActions.setLogin(true));
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
    FB.login((response) => {
      if (response.authResponse) {
        console.log('user logged in', response);
        this.props.setLogin();
      }
      else {
        console.log('not log in');
      }
    });
  }

  handleOnLogoutWithFB() {
    FB.logout(() => this.props.setLogout());
  }

  render() {
    const { isLogin } = this.props;
    return (
      <nav className="nav has-shadow" styleName="nav">
        <div className="container">
          <div className="nav-left">
            <NavLink to="/" className="nav-item">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
            </NavLink>
            <NavLink to="/explore" className="nav-item is-tab" activeClassName="is-active">Explore</NavLink>
            { isLogin &&
              <NavLink to="/create-overlay" className="nav-item is-tab" activeClassName="is-active">Create Profile Overlay</NavLink>
            }
          </div>
          <div className="nav-right">
            <div className="nav-item">
              { !isLogin &&
                <a className="button is-info" onClick={this.handleOnLoginWithFB}>
                  <span className="icon">
                    <span className="icon">
                      <i className="fa fa-facebook" />
                    </span>
                  </span>
                  <span>Login with Facebook</span>
                </a>
              }
              { isLogin &&
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
