import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from './LandingCover.scss';
import LoginModal from './LoginModal';

@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
)
@withRouter
@CSSModules(styles, { allowMultiple: true })
export default class LandingCover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal: false,
    };
    this.onClickCreateOverlay = this.onClickCreateOverlay.bind(this);
  }

  onClickCreateOverlay() {
    const { history, isLogin } = this.props;
    console.log('navigate');
    if (isLogin) {
      history.push('/create-overlay');
    }
    else {
      console.log('non login popup modal');
      this.setState({ isShowLoginModal: true });
    }
  }

  render() {
    const { isShowLoginModal } = this.state;
    const { isLogin } = this.props;
    return (
      <div styleName="landing-cover-container">
        <img src={require('../../shared/logo_white.png')} alt="Logo" styleName="branding" />
        <p styleName="description">Create new profile picture with overlay frame.</p>
        <div styleName="btn-container">
          <Link to="/explore" styleName="btn explore-btn">
            <span className="icon">
              <i className="fa fa-search" style={{ marginRight: '8px' }} />
            </span>
            <span>Explore</span>
          </Link>
          <a onClick={this.onClickCreateOverlay} styleName="btn make-one">
            <span className="icon">
              <i className="fa fa-plus-circle" style={{ marginRight: '8px' }} />
            </span>
            <span>Create Overlay</span>
          </a>
        </div>
        { isShowLoginModal && !isLogin &&
          <LoginModal onCloseModal={() => this.setState({ isShowLoginModal: false })} />
        }
      </div>
    );
  }
}
