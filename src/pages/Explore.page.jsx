import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import OverlayBlock from '../components/explore/OverlayBlock';

@withRouter
export default class ExplorePage extends Component {
  render() {
    const { history } = this.props;
    console.log(history);
    const mockArr = [
      {
        title: 'A',
        description: 'Description for A',
      },
      {
        title: 'B',
        description: 'Description for B',
      },
      {
        title: 'C',
        description: 'Description for C',
      },
      {
        title: 'D',
        description: 'Description for D',
      },
      {
        title: 'E',
        description: 'Description for E',
      },
      {
        title: 'F',
        description: 'Description for F',
      },
      {
        title: 'G',
        description: 'Description for G',
      },
    ];
    return (
      <div>
        <h1>Explore</h1>
        <div className="columns is-multiline" style={{ marginTop: '10px', marginBottom: '20px' }}>
          {mockArr.map(({ title, description }) => (
            <div className="column is-3" key={title}>
              <OverlayBlock
                key={title}
                title={title}
                description={description}
                onClickBlock={() => {
                  console.log('You click:', title, description);
                  history.push(`/view-overlay/${title}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

