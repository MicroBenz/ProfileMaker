import React, { Component } from 'react';

export default class CreateProfileImage extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Create CreateProfileImage</h1>
        <h3>{match.params.slug}</h3>
      </div>
    );
  }
}
