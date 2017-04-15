import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './ImageUpload.scss';

@CSSModules(styles)
export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  getResizedImage(img) {
    let { width, height } = img;
    const MAX_WIDTH = 1024;
    const MAX_HEIGHT = 1024;
    if (width > height) {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    else if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const context = tempCanvas.getContext('2d');
    context.drawImage(img, 0, 0, width, height);
    return tempCanvas.toDataURL();
  }

  handleUploadFile(event) {
    const files = event.target.files;
    if (!files) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        this.props.onUploadImageSucceed(this.getResizedImage(img));
      };
    };
  }

  render() {
    return (
      <div>
        <h2 styleName="step-title">Step 1: Upload image</h2>
        <div styleName="browse-button-wrapper">
          <a className="button is-info">Browse</a>
          <input
            type="file"
            accept="image/*"
            onChange={this.handleUploadFile}
            styleName="hidden-input"
          />
        </div>
      </div>
    );
  }
}
