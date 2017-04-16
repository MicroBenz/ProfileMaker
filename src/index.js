/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import { actions as authActions } from './store/auth';
import { loginWithFB } from './utils/auth';
import App from './App';

class AppContainer extends Component {
  componentDidMount() {
    window.fbAsyncInit = async () => {
      FB.init({
        appId: '326628934402249',
        cookie: true,
        xfbml: true,
        version: 'v2.8',
      });
      FB.getLoginStatus(async (response) => {
        console.log(response);
        if (response.authResponse) {
          const { accessToken } = response.authResponse;
          const { token } = await loginWithFB(accessToken);
          store.dispatch(authActions.setLoginSuccess(token));
          store.dispatch(authActions.getUser(token));
        }
        else {
          store.dispatch(authActions.setNonLogin());
        }
        this.setState({
          isWaitingFacebookApi: false,
        });
      });
    };

    ((d, s, id) => {
      let js = d.getElementsByTagName(s)[0];
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
ReactDOM.render(<AppContainer />, document.getElementById('apps'));
