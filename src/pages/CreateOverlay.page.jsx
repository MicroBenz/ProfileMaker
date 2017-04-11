import React, { Component } from 'react';
import { getToken } from '../utils/token';
// import { withRouter } from 'react-router-dom';
// export default () => (<h1>Create Overlay</h1>);

// @withRouter
export default class CreateOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      imgFile: null,
    };
    this.handleCreateOverlay = this.handleCreateOverlay.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  handleCreateOverlay(e) {
    e.preventDefault();
    const { imgFile, title, description } = this.state;
    if (this.state.imgFile && title.trim() !== '' && description.trim() !== '') {
      console.log('upload form');
      const data = new FormData();
      data.append('overlayImg', this.state.imgFile);
      data.append('title', title);
      data.append('description', description);
      const token = getToken();
      fetch('http://localhost:3000/api/overlay', {
        method: 'POST',
        headers: {
          'x-access-token': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
      .then(response => response.json())
      .then(overlay => console.log(overlay));
    }
  }

  handleSelectedFile(e) {
    const imgFile = e.target.files[0];
    console.log(imgFile);
    this.setState({
      imgFile,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Create Overlay</h1>
        <form>
          <input type="text" placeholder="title" onChange={e => this.setState({ title: e.target.value })} />
          <textarea onChange={e => this.setState({ description: e.target.value })} rows="3" />
          <input type="file" onChange={this.handleSelectedFile} />
          <button onClick={this.handleCreateOverlay}>save</button>
        </form>
      </div>
    );
  }
}
