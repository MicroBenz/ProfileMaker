import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import styles from './Nav.scss';

@cssmodules(styles, { allowMultiple: true })
export default class Nav extends Component {
  render() {
    return (
      <nav styleName="nav has-shadow">
        <div styleName="container">
          <div styleName="nav-left">
            <a styleName="nav-item">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
            </a>
            <a styleName="nav-item is-tab is-hidden-mobile is-active">Home</a>
            <a styleName="nav-item is-tab is-hidden-mobile">Features</a>
            <a styleName="nav-item is-tab is-hidden-mobile">Pricing</a>
            <a styleName="nav-item is-tab is-hidden-mobile">About</a>
          </div>
          <span styleName="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div styleName="nav-right nav-menu">
            <a styleName="nav-item is-tab is-hidden-tablet is-active">Home</a>
            <a styleName="nav-item is-tab is-hidden-tablet">Features</a>
            <a styleName="nav-item is-tab is-hidden-tablet">Pricing</a>
            <a styleName="nav-item is-tab is-hidden-tablet">About</a>
            <a styleName="nav-item is-tab">
              <figure styleName="image is-16x16" style={{marginRight: '8px'}}>
                <img src="http://bulma.io/images/jgthms.png" />
              </figure>
              Profile
            </a>
            <a styleName="nav-item is-tab">Log out</a>
          </div>
        </div>
      </nav>
    )
  }
}
