import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getToken } from '../utils/token';
import styles from './CreateOverlay.page.scss';

@withRouter
@CSSModules(styles)
@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
)
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
        },
        body: data,
      })
      .then(response => response.json())
      .then(overlay => {
        if (overlay.code) {
          console.log('Something error');
        }
        else {
          const { slug } = overlay;
          this.props.history.push(`/view-overlay/${slug}`);
        }
      });
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
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1>Create Overlay</h1>
        <div className="columns">
            <div className="column is-half">
              <figure className="image is-256x256" styleName="upload-img">
                <img src="http://bulma.io/images/placeholders/128x128.png"/>
              </figure>
              <div className="field" styleName="upload-div">
                <label className="label">choose your image</label>
                <p className="control" styleName="upload-p">
                  <input className="input is-primary" styleName="input-upload" type="file"  onChange={this.handleSelectedFile}/>
                </p>
              </div>
            </div>
            <div className="column is-half" styleName="img-form">
                <div className="field">
                  <label className="label">title</label>
                  <p className="control">
                    <input className="input is-primary" styleName="input-title" type="text" onChange={e => this.setState({ title: e.target.value })}/>
                  </p>
                </div>
                <div className="field" styleName="img-desc">
                  <label className="label">description</label>
                  <p className="control">
                    <textarea className="textarea is-primary" onChange={e => this.setState({ description: e.target.value })}></textarea>
                  </p>
                </div>
                <div className="field" styleName="btn-div">
                  <p className="control">
                    <button className="button is-primary" styleName="save-btn" onClick={this.handleCreateOverlay}>Save</button>
                  </p>
                </div>
            </div>
        </div>
      </div>
    ); 
      {/*<div styleName="createOverlay-form">
        <h1>Create Overlay</h1>
        <div className="field">
          <label className="label">title</label>
          <p className="control">
            <input className="input is-primary" styleName="input-overlay" type="text" onChange={e => this.setState({ title: e.target.value })}/>
          </p>
        </div>
        <div className="field">
          <label className="label">description</label>
          <p className="control">
            <textarea className="textarea is-primary" onChange={e => this.setState({ description: e.target.value })}></textarea>
          </p>
        </div>
        <div className="field">
          <label className="label">choose your image</label>
          <p className="control">
            <input className="input is-primary" styleName="input-overlay" type="file"  onChange={this.handleSelectedFile}/>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-primary" onClick={this.handleCreateOverlay}>Save</button>
          </p>
        </div>
        <form>
          <input type="text" placeholder="title" onChange={e => this.setState({ title: e.target.value })} />
          <textarea onChange={e => this.setState({ description: e.target.value })} rows="3" />
          <input type="file" onChange={this.handleSelectedFile} />
          <button onClick={this.handleCreateOverlay}>save</button>
        </form>
      </div>*/}
    
  }
}
