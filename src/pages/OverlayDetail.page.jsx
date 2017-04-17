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
        
        <p styleName="picture-name">{match.params.slug}</p>
        <div className="columns">
          <div className="column is-3"></div>
          <div className="column is-6">
            <div styleName="picture_area">
              <ImageWithOverlay canvasID={match.params.slug} overlayPath={`http://localhost:3000/api/overlay/image/${overlay.img}`} usePlaceholder />
            </div>
          </div>
          <div className="column is-3"></div>
        </div>

        <div className="columns">
          <div className="column is-3"></div>
          <div styleName="describe-area">
            <p>{overlay.description}</p>
          </div>
          <div className="column is-3"></div>
        </div>
        
        <div className="block">
          <a className="button is-primary" onClick={() => history.push(`/create-profile-image/${match.params.slug}`)}>Create!</a>
        </div>

      </div>
    );
  }
}
