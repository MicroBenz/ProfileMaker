import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import LoginButton from './LoginButton';
import { actions as authActions } from '../../store/auth';
import { loginWithFB } from '../../utils/auth';
import styles from './Nav.scss';

@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
    user: auth.user,
  }),
  dispatch => ({
    setLogout() {
      dispatch(authActions.setNonLogin());
    },
    setLogin(token) {
      dispatch(authActions.setLoginSuccess(token));
    },
    getUser(token) {
      dispatch(authActions.getUser(token));
    },
  }),
)
@CSSModules(styles)
class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleOnLoginWithFB = this.handleOnLoginWithFB.bind(this);
    this.handleOnLogoutWithFB = this.handleOnLogoutWithFB.bind(this);
  }

  handleOnLoginWithFB() {
    console.log('press login with fb');
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

  handleOnLogoutWithFB() {
    FB.logout(() => {
      this.props.setLogout();
    });
  }

  render() {
    const { isLogin, user } = this.props;
    console.log(user);
    return (
      <nav className="nav has-shadow" styleName="nav">
        <div className="container">
          <div className="nav-left">
            <NavLink to="/" className="nav-item" styleName="branding-wrapper" exact>
              <img src={require('../../shared/logo.png')} alt="ProfileMaker Logo" />
            </NavLink>
            <NavLink to="/explore" className="nav-item is-tab" activeClassName="is-active">Explore</NavLink>
            { isLogin &&
              <NavLink to="/create-overlay" className="nav-item is-tab" activeClassName="is-active" exact>Create Profile Overlay</NavLink>
            }
          </div>
          <div className="nav-right">
            { isLogin &&
              <div className="nav-item">
                <p>Welcome back {user.firstName}!</p>
              </div>
            }
            <div className="nav-item">
              { !isLogin &&
                <LoginButton />
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

export default () => <Route component={Nav} />;
