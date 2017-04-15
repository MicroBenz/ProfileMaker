import React, { Component } from 'react';

import ImageUpload from '../components/create-profile-image/ImageUpload';
import ImageCropper from '../components/create-profile-image/ImageCropper';
import ImageWithOverlay from '../components/preview/ImageWithOverlay';
import ImageResult from '../components/create-profile-image/ImageResult';

export default class CreateProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      selectedOverlayImg: '',
    };
    this.onUploadImageSucceed = this.onUploadImageSucceed.bind(this);
    this.onConfirmCropped = this.onConfirmCropped.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`http://localhost:3000/api/overlay/${match.params.slug}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(({ img }) => this.setState({ selectedOverlayImg: `http://localhost:3000/api/overlay/image/${img}` }));
  }

  onUploadImageSucceed(imgDataURL) {
    this.setState({
      currentStep: 2,
      originalImg: imgDataURL,
    });
  }

  onConfirmCropped(imgCanvas) {
    this.setState({
      currentStep: 3,
      croppedImg: imgCanvas,
    });
  }

  render() {
    const { match } = this.props;
    const { currentStep, selectedOverlayImg, originalImg } = this.state;
    if (selectedOverlayImg === '')
      return <h1>Loading...</h1>;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Create Profile Image</h1>
        { currentStep === 1 &&
          <ImageUpload onUploadImageSucceed={this.onUploadImageSucceed} />
        }
        { currentStep === 2 &&
          <ImageCropper overlayImg={selectedOverlayImg} img={originalImg} onConfirmCropped={this.onConfirmCropped} />
        }
        { currentStep === 3 &&
          <ImageResult croppedImg={this.state.croppedImg} overlayImg={selectedOverlayImg} slug={match.params.slug} />
        }
      </div>
    );
  }
}
