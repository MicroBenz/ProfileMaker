import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from './Nav.scss';

@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
)
@CSSModules(styles)
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleOnLoginWithFB = this.handleOnLoginWithFB.bind(this);
  }

  handleOnLoginWithFB() {
    console.log('press login with fb');
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
            <NavLink to="/create-overlay" className="nav-item is-tab" activeClassName="is-active">Create Profile Overlay</NavLink>
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
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
