import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as createProfileActions } from '../store/createProfile';
import { get } from '../utils/api';
import ImageUpload from '../components/create-profile-image/ImageUpload';
import ImageCropper from '../components/create-profile-image/ImageCropper';
import FullScreenLoader from '../components/loader/FullScreenLoader';
import ImageResult from '../components/create-profile-image/ImageResult';

@connect(
  ({ createProfile }) => ({
    selectedOverlayImg: createProfile.selectedOverlayImg,
    userImage: createProfile.image,
    currentStep: createProfile.currentStep,
  }),
  dispatch => ({
    setSelectedOverlay(imagePath) {
      dispatch(createProfileActions.setSelectedOverlay(imagePath));
    },
    onUploadImageSucceed(imageDataURL) {
      dispatch(createProfileActions.onUploadImageSucceed(imageDataURL));
    },
    onConfirmCropped(imageCanvas) {
      console.log(imageCanvas);
      dispatch(createProfileActions.onConfirmCropped(imageCanvas));
    },
    clearState() {
      dispatch(createProfileActions.clearState());
    },
  }),
)
export default class CreateProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      selectedOverlayImg: '',
    };
    // this.onUploadImageSucceed = this.onUploadImageSucceed.bind(this);
    // this.onConfirmCropped = this.onConfirmCropped.bind(this);
  }

  async componentDidMount() {
    this.props.clearState();
    const { match } = this.props;
    const { img } = await get(`/overlay/${match.params.slug}`);
    this.props.setSelectedOverlay(`http://localhost:3000/api/overlay/image/${img}`);
    // fetch(`http://localhost:3000/api/overlay/${match.params.slug}`, {
    //   method: 'GET',
    // })
    // .then(response => response.json())
    // .then(({ img }) => this.props.setSelectedOverlay(`http://localhost:3000/api/overlay/image/${img}`));
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
    const { match, selectedOverlayImg, currentStep, userImage } = this.props;
    const { originalImg } = this.state;
    if (selectedOverlayImg === '') return <FullScreenLoader />;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Create Profile Image</h1>
        { currentStep === 1 &&
          <ImageUpload
            onUploadImageSucceed={this.props.onUploadImageSucceed}
          />
        }
        { currentStep === 2 &&
          <ImageCropper
            overlayImg={this.props.selectedOverlayImg}
            img={this.props.userImage}
            onConfirmCropped={this.props.onConfirmCropped}
          />
        }
        { currentStep === 3 &&
          <ImageResult
            croppedImg={userImage}
            overlayImg={selectedOverlayImg}
            slug={match.params.slug}
          />
        }
      </div>
    );
  }
}
