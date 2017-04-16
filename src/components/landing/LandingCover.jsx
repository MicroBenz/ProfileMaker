import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './LandingCover.scss';

const LandingCover = () => (
  <div styleName="landing-cover-container">
    <img src={require('../../shared/logo_white.png')} alt="Logo" styleName="branding" />
    <p styleName="description">Create new profile picture with overlay frame.</p>
    <div styleName="btn-container">
      <Link to="/explore" styleName="btn explore-btn">Explore</Link>
      <Link to="/create-overlay" styleName="btn make-one">Create Overlay</Link>
    </div>
  </div>
);

export default CSSModules(LandingCover, styles, { allowMultiple: true });
