import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes';
import Nav from './components/nav/Nav';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWaitingFacebookApi: true,
    };
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '326628934402249',
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });

      FB.getLoginStatus((response) => {
        console.log(response);
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
    if (this.state.isWaitingFacebookApi) {
      return <h1>Loading...</h1>;
    }
    return (
      <Router>
        <div>
          <Nav />
          <AppRoutes />
        </div>
      </Router>
    );
  }
}
