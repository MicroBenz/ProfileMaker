import React, { Component } from 'react';

import ImageUpload from '../components/create-profile-image/ImageUpload';
import ImageCropper from '../components/create-profile-image/ImageCropper';

export default class CreateProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      selectedOverlayImg: '',
    };
    this.onUploadImageSucceed = this.onUploadImageSucceed.bind(this);
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

  render() {
    const { match } = this.props;
    const { currentStep, selectedOverlayImg } = this.state;
    if (selectedOverlayImg === '')
      return <h1>Loading...</h1>;
    return (
      <div>
        <h1>Create CreateProfileImage</h1>
        <h3>{match.params.slug} {currentStep}</h3>
        { currentStep === 1 &&
          <ImageUpload onUploadImageSucceed={this.onUploadImageSucceed} />
        }
        { currentStep === 2 &&
          <ImageCropper overlayImg={selectedOverlayImg} img={this.state.originalImg} />
        }
      </div>
    );
  }
}
