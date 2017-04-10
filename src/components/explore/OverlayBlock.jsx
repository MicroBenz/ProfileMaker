import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './OverlayBlock.scss';

const OverlayBlock = ({ title, description, onClickBlock }) => (
  <div styleName="overlay-block" onClick={onClickBlock}>
    <img src={require('./test.png')} alt="overlay" />
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

OverlayBlock.propTypes = {
  onClickBlock: PropTypes.func.isRequired,
};
export default CSSModules(styles)(OverlayBlock);
