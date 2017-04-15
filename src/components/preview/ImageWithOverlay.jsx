import React, { Component } from 'react';

export default class ImageWithOverlay extends Component {
  componentDidMount() {
    const { overlayPath, avatarImg, canvasID, imgCanvas } = this.props;
    // const destCanvas = document.getElementById(canvasID);
    // const destContext = destCanvas.getContext('2d');
    // const img = this.props.imgCanvas;
    // const avatarImgObj = new Image();
    // avatarImgObj.src = avatarImg;
    // avatarImgObj.onload = () => {
    //   destContext.drawImage(avatarImgObj, 0, 0, destCanvas.width, destCanvas.height);
    //   const overlayImg = new Image();
    //   overlayImg.src = overlayPath;
    //   overlayImg.onload = () => {
    //     destContext.drawImage(overlayImg, 0, 0, destCanvas.width, destCanvas.height);
    //   };
    // };
    const destCanvas = document.getElementById(canvasID);
    const destContext = destCanvas.getContext('2d');
    destContext.drawImage(imgCanvas, 0, 0, destCanvas.width, destCanvas.height);

    const overlayImg = new Image();
    overlayImg.src = overlayPath;
    overlayImg.onload = () => {
      destContext.drawImage(overlayImg, 0, 0, destCanvas.width, destCanvas.height);
    };
  }
  render() {
    const { canvasID, overlayPath, avatarImg } = this.props;
    return (
      <div style={{ width: '500px', height: '500px' }}>
        <canvas
          id={canvasID}
          width="1024" height="1024"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }
}
