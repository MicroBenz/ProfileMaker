import React, { Component } from 'react';

import LoginButton from '../nav/LoginButton';

export default class LoginModal extends Component {
  render() {
    const { onCloseModal } = this.props;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login</p>
            <button className="delete" onClick={onCloseModal} />
          </header>
          <section className="modal-card-body" style={{ textAlign: 'center' }}>
            <h3 style={{ paddingBottom: '20px' }}>Login with Facebook to gain access for Create Overlay</h3>
            <LoginButton />
          </section>
        </div>
      </div>
    );
  }
}
