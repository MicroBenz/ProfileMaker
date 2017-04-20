import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './FullScreenLoader.scss';

const FullScreenLoader = () => (
  <div className="ball-pulse" styleName="full-screen-loader">
    <div style={{ backgroundColor: '#0092cc' }} />
    <div style={{ backgroundColor: '#0092cc' }} />
    <div style={{ backgroundColor: '#0092cc' }} />
  </div>
);

export default CSSModules(FullScreenLoader, styles);
