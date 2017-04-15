import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import OverlayBlock from '../components/explore/OverlayBlock';
import ImageWithOverlay from '../components/preview/ImageWithOverlay';

@withRouter
@connect(
  ({ auth }) => ({
    user: auth.user,
  }),
)
export default class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayItems: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/overlay', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(overlayItems => this.setState({ overlayItems }));
  }

  render() {
    const { overlayItems } = this.state;
    const { history, user } = this.props;
    console.log(overlayItems);
    return (
      <div>
        <h1>Explore</h1>
        <div className="columns is-multiline" style={{ marginTop: '10px', marginBottom: '20px' }}>
          {overlayItems.map(({ _id, title, description, slug, img }) => (
            <div className="column is-3" key={title}>
              <OverlayBlock
                key={_id}
                title={title}
                description={description}
                overlayImgPath={`http://localhost:3000/api/overlay/image/${img}`}
                userImgPath={user.profileImage}
                onClickBlock={() => {
                  console.log('You click:', slug);
                  history.push(`/view-overlay/${slug}`);
                }}
                slug={slug}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

