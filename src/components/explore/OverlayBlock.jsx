import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import placeholderImg from './people.png';
import ImageWithOverlay from '../preview/ImageWithOverlay';
import styles from './OverlayBlock.scss';

const OverlayBlock = ({ slug, title, description, overlayImgPath, userImgPath, onClickBlock }) => (
  <div styleName="overlay-block" onClick={onClickBlock}>
    <ImageWithOverlay canvasID={slug} overlayPath={overlayImgPath} usePlaceholder />
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

OverlayBlock.propTypes = {
  onClickBlock: PropTypes.func.isRequired,
};
export default CSSModules(styles)(OverlayBlock);
