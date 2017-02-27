import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import styles from './Nav.scss';

@cssmodules(styles, { allowMultiple: true })
export default class Nav extends Component {
  render() {
    return (
      <nav className="nav has-shadow">
        <div className="container">
          <h1>WHAT</h1>
        </div>
      </nav>
    );
  }
}
