import React, { Component } from 'react';

import placeholderImg from './placeholder-grey.png';

export default class ImageWithOverlay extends Component {
  componentDidMount() {
    this.drawOverlay(this.props);
  }

  componentWillUpdate(nextProps) {
    const { overlayPath, avatarImg, canvasID, imgCanvas, usePlaceholder } = nextProps;
    if (this.props.overlayPath !== overlayPath) this.drawOverlay(nextProps);
  }

  drawOverlay(props) {
    const { overlayPath, avatarImg, canvasID, imgCanvas, usePlaceholder } = props;
    const destCanvas = document.getElementById(canvasID);
    const destContext = destCanvas.getContext('2d');
    destContext.clearRect(0, 0, destCanvas.width, destCanvas.height);
    if (usePlaceholder) {
      const avatarImgObj = new Image();
      avatarImgObj.src = placeholderImg;
      avatarImgObj.onload = () => {
        destContext.drawImage(avatarImgObj, 0, 0, destCanvas.width, destCanvas.height);
        const overlayImg = new Image();
        overlayImg.src = overlayPath;
        overlayImg.onload = () => {
          destContext.drawImage(overlayImg, 0, 0, destCanvas.width, destCanvas.height);
        };
      };
    }
    else {
      imgCanvas.crossOrigin = 'Anonymous';
      destContext.drawImage(imgCanvas, 0, 0, destCanvas.width, destCanvas.height);
      const overlayImg = new Image();
      overlayImg.crossOrigin = 'Anonymous';
      overlayImg.src = overlayPath;
      overlayImg.onload = () => {
        destContext.drawImage(overlayImg, 0, 0, destCanvas.width, destCanvas.height);
      };
    }
  }

  render() {
    const { canvasID, overlayPath, avatarImg } = this.props;
    return (
      <div style={{ width: '100%', height: 'auto' }}>
        <canvas
          id={canvasID}
          width="1024" height="1024"
          style={{ width: '100%', height: '100%', border: '4px solid #4a4a4a' }}
        />
      </div>
    );
  }
}
