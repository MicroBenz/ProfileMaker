import React, { Component } from 'react';

import LandingCover from '../components/landing/LandingCover';
import LoginModal from '../components/landing/LoginModal';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: true,
    };

    this.onCloseLoginModal = this.onCloseLoginModal.bind(this);
  }

  onCloseLoginModal() {
    this.setState({
      isShowLoginModal: false,
    });
  }

  render() {
    const { isShowLoginModal } = this.state;
    console.log(isShowLoginModal);
    return (
      <div style={{ height: '100%' }}>
        { isShowLoginModal &&
          <LoginModal onCloseModal={this.onCloseLoginModal} />
        }
        <LandingCover />
      </div>
    );
  }
}
