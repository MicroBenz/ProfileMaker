import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
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
      <div>
        <h1>OverlayDetail {match.params.slug}</h1>
        <img style={{ width: '200px' }} src={`http://localhost:3000/api/overlay/image/${overlay.img}`} />
        <h2>{overlay.title}</h2>
        <h2>{overlay.description}</h2>
        <a onClick={() => history.push(`/create-profile-image/${match.params.slug}`)}>Create!</a>
      </div>
    );
  }
}
