import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';

import ImageWithOverlay from '../components/preview/ImageWithOverlay';
import { post } from '../utils/api';
import { popupSuccessToast, popupInfoToast, popupErrorToast } from '../utils/toast';
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
      try {
        const overlay = await post('/overlay', data);
        if (overlay.code) {
          popupErrorToast('Error', 'Can not create overlay image.');
        }
        else {
          popupSuccessToast('Overlay created');
          
          const { slug } = overlay;
          this.props.history.push(`/explore/${slug}`);
        }
      }
      catch (excp) {
        console.log(excp);
      }
    }
    else {
      this.popupErrorToastr('Form is missing some field.', 'Please fill out form.');
    }
  }

  handleSelectedFile(e) {
    const self = this;
    const imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = ({ target: { result } }) => {
      const img = new Image();
      img.src = result;
      img.onload = () => {
        if (img.width / img.height !== 1) {
          popupInfoToast('Non-square size image', 'Please upload square size image.');
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
    const { isLogin } = this.props;
    const { imgPreview } = this.state;
    if (!isLogin) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="container">
        <h1>Create Overlay</h1>
        <div className="columns" style={{ paddingTop: '10px' }}>
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
            <div className="field">
              <p className="control">
                <button className="button is-primary" onClick={this.handleCreateOverlay}>Create overlay</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
