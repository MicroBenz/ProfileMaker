import React, { Component } from 'react';

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
      console.log('error on select file');
      return;
    }
    console.log('selected file', files);
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      console.log('file is load');
      img.onload = () => {
        this.props.onUploadImageSucceed(this.getResizedImage(img));
      };
    };
  }

  render() {
    return (
      <div>
        <h1>Step 1: Upload image</h1>
        <input
          type="file"
          accept="image/*"
          onChange={this.handleUploadFile}
        />
      </div>
    );
  }
}
