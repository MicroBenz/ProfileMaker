import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';

import ImageWithOverlay from '../components/preview/ImageWithOverlay';
import { post } from '../utils/api';
import styles from './CreateOverlay.page.scss';

@withRouter
@connect(
  ({ auth }) => ({
    isLogin: auth.isLogin,
  }),
)
@CSSModules(styles)
export default class CreateOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      imgFile: null,
      imgPreview: null,
    };
    this.handleCreateOverlay = this.handleCreateOverlay.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  async handleCreateOverlay(e) {
    e.preventDefault();
    const { imgFile, title, description } = this.state;
    if (imgFile && title.trim() !== '' && description.trim() !== '') {
      const data = new FormData();
      data.append('overlayImg', imgFile);
      data.append('title', title);
      data.append('description', description);
      // const token = getToken();
      try {
        const overlay = await post('/overlay', data);
        if (overlay.code) {
          console.log('something error');
        }
        else {
          const { slug } = overlay;
          this.props.history.push(`/explore/${slug}`);
        }
      }
      catch (excp) {
        console.log(excp);
      }
    }
  }

  handleSelectedFile(e) {
    const self = this;
    const imgFile = e.target.files[0];
    // console.log(imgFile);
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = ({ target: { result } }) => {
      const img = new Image();
      img.src = result;
      img.onload = () => {
        console.log(img.width, img.height);
        if (img.width / img.height !== 1) {
          console.log('not square');
        }
        else {
          self.setState({
            imgFile,
            imgPreview: result,
          });
        }
      };
    };
  }

  render() {
    console.log(this.state);
    const { isLogin } = this.props;
    const { imgPreview } = this.state;
    if (!isLogin) {
      return (
        <Redirect to="/" />
      );
    }
    console.log('rerender');
    return (
      <div className="container">
        <h1>Create Overlay</h1>
        <div className="columns">
          <div className="column is-4" styleName="upload-column">
            {imgPreview === null &&
              <img src={require('./upload_preview.png')} alt="upload preview" />
            }
            {imgPreview !== null &&
              <ImageWithOverlay canvasID="upload-preview" overlayPath={imgPreview} usePlaceholder />
            }
            <p styleName="upload-suggestion">Image must be square and has transparent part.</p>
            <div styleName="upload-btn-wrapper">
              <a className="button is-info">Upload Overlay</a>
              <input
                styleName="hidden-upload"
                type="file"
                onChange={this.handleSelectedFile}
                accept="image/png"
              />
            </div>
          </div>
          <div className="column is-8">
            <div className="field">
              <label className="label">Title</label>
              <p className="control">
                <input
                  className="input is-primary"
                  styleName="input-title"
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </p>
            </div>
            <div className="field" styleName="img-desc">
              <label className="label">Description</label>
              <p className="control">
                <textarea
                  className="textarea is-primary"
                  onChange={e => this.setState({ description: e.target.value })}
                />
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
  }
}
