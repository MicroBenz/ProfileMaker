import React, { Component } from 'react';

import ImageWithOverlay from '../preview/ImageWithOverlay';

export default class ImageResult extends Component {
  constructor(props) {
    super(props);
    this.onClickDownload = this.onClickDownload.bind(this);
  }

  onClickDownload() {
    const resultCanvas = document.getElementById('result-profile');
    resultCanvas.crossOrigin = 'Anonymous';
    const img = resultCanvas.toDataURL('image/png');
    const temp = document.createElement('a');
    temp.setAttribute('href', img);
    temp.setAttribute('download', `profile-${this.props.slug}.png`);
    temp.style.display = 'none';
    document.body.appendChild(temp);
    temp.click();
    document.body.removeChild(temp);
  }

  render() {
    const { overlayImg, croppedImg } = this.props;
    return (
      <div style={{ width: 400, height: 400, margin: '0 auto' }}>
        <h2>Your image is completed!</h2>
        <ImageWithOverlay imgCanvas={croppedImg} overlayPath={overlayImg} canvasID="result-profile" />
        <a className="button is-medium is-info" onClick={this.onClickDownload}>Download!</a>
      </div>
    );
  }
}
