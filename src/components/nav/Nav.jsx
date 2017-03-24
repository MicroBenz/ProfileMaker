import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="nav has-shadow">
    <div className="container">
      <div className="nav-left">
        <Link to="/a">Go to A</Link>
        <Link to="/b">Go to B</Link>
      </div>
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

export default Nav;
