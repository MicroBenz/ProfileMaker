import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import ImageWithOverlay from '../components/preview/ImageWithOverlay';
import styles from './OverlayDetail.page.scss';

@withRouter
@CSSModules(styles)
export default class OverlayDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`http://localhost:3000/api/overlay/${match.params.slug}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(overlay => this.setState({ overlay }));
  }

  render() {
    const { overlay } = this.state;
    const { match, history } = this.props;
    console.log(overlay);
    if (overlay.img === undefined) {
      return <div><h1>Loading...</h1></div>;
    }
    return (
      <div className="container" styleName="center">
        <h1 styleName="picture-name">{overlay.title}</h1>
        <div styleName="picture-area">
          <ImageWithOverlay
            canvasID={match.params.slug}
            overlayPath={`http://localhost:3000/api/overlay/image/${overlay.img}`}
            usePlaceholder
          />
        </div>
        <p styleName="describe-area">{overlay.description}</p>
        <div className="block">
          <a className="button is-info" onClick={() => history.push(`/explore/${match.params.slug}/create-profile-image`)}>Create new picture with this overlay</a>
        </div>

      </div>
    );
  }
}
