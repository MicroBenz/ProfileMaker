import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import styles from './Nav.scss';

@cssmodules(styles, { allowMultiple: true })
export default class Nav extends Component {
  render() {
    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-right">
            <div className="nav-item">
              <a className="button is-info">
                <span className="icon">
                  <span className="icon">
                    <i className="fa fa-download" />
                  </span>
                </span>
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
