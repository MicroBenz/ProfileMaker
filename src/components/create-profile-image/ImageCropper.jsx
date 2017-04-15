import React, { Component } from 'react';
// import Cropper from 'cropperjs';
import Croppie from 'croppie';

export default class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      croppedImg: '',
    };
    // this.setPreviewImage = this.setPreviewImage.bind(this);
    this.onClickCroppedImage = this.onClickCroppedImage.bind(this);
  }

  componentDidMount() {
    // this.cropper = new Cropper(document.getElementById('imageCropper'), {
    //   aspectRatio: 1 / 1,
    //   viewMode: 3,
    //   ready: this.setPreviewImage,
    //   cropend: this.setPreviewImage,
    // });
    this.croppie = new Croppie(document.getElementById('image-cropper'), {
      url: this.props.img,
      enableExif: true,
      viewport: {
        width: 330,
        height: 330,
        type: 'square',
      },
      boundary: {
        width: 350,
        height: 350,
      },
    });
  }

  // setPreviewImage() {
  //   const imageData = this.cropper.getCroppedCanvas().toDataURL();
  //   this.setState({
  //     croppedImg: imageData,
  //   });
  // }

  onClickCroppedImage() {
    this.croppie.result({
      type: 'rawcanvas',
      size: {
        width: 1000,
        height: 1000,
      },
      format: 'png',
    })
    .then(resp => this.props.onConfirmCropped(resp));
    // const imageData = this.cropper.getCroppedCanvas();
    // this.props.onConfirmCropped(imageData);
  }

  render() {
    const { img, overlayImg } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ paddingBottom: 10 }}>Step 2: Crop your image</h2>
        <div>
          <div id="image-cropper" style={{ paddingBottom: 10 }} />
          <button
            className="button is-medium is-info"
            onClick={this.onClickCroppedImage}
          >Crop</button>
        </div>
      </div>
    );
  }
}
