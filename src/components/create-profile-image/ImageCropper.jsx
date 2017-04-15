import React, { Component } from 'react';
import Cropper from 'cropperjs';
// import Croppie from 'croppie';

export default class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      croppedImg: '',
    };
    this.setPreviewImage = this.setPreviewImage.bind(this);
    this.onClickCroppedImage = this.onClickCroppedImage.bind(this);
  }

  componentDidMount() {
    this.cropper = new Cropper(document.getElementById('imageCropper'), {
      aspectRatio: 1 / 1,
      viewMode: 3,
      ready: this.setPreviewImage,
      cropend: this.setPreviewImage,
    });
    // this.croppie = new Croppie(document.getElementById('imageCropper'), {
    //   enableExif: true,
    //   viewport: {
    //     width: 280,
    //     height: 280,
    //     type: 'square',
    //   },
    //   boundary: {
    //     width: 300,
    //     height: 300,
    //   },
    // });
  }

  setPreviewImage() {
    const imageData = this.cropper.getCroppedCanvas().toDataURL();
    this.setState({
      croppedImg: imageData,
    });
  }

  onClickCroppedImage() {
    // this.croppie.result({
    //   type: 'canvas',
    //   size: {
    //     width: 1200,
    //     height: 1200,
    //   },
    //   format: 'png',
    // })
    // .then(resp => console.log('complete crop:', resp));
    const imageData = this.cropper.getCroppedCanvas();
    this.props.onConfirmCropped(imageData);
  }

  render() {
    const { img, overlayImg } = this.props;
    return (
      <div>
        <h1>Step 2: Cropped Image</h1>
        <div className="columns">
          <div className="column is-6">
            <img src={img} id="imageCropper" style={{ position: 'relative' }} />
            <button
              className="button is-medium is-info"
              onClick={this.onClickCroppedImage}
            >ครอปรูปเสร็จแล้ว</button>
          </div>
          <div className="column is-6">
            {/*<img src={overlayImg} />*/}
            { this.state.croppedImg !== '' &&
              <img src={this.state.croppedImg} />
            }
          </div>
        </div>
      </div>
    );
  }
}
