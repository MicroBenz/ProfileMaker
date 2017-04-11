import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import OverlayBlock from '../components/explore/OverlayBlock';

@withRouter
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
    const { history } = this.props;
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
                imgPath={`http://localhost:3000/api/overlay/image/${img}`}
                onClickBlock={() => {
                  console.log('You click:', slug);
                  history.push(`/view-overlay/${slug}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

