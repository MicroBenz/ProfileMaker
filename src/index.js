/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

if (process.env.NODE_ENV !== 'production') {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('apps')
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept('./App', () => {
      render(App);
    });
  }
}

else {
  ReactDOM.render(<App />, document.getElementById('apps'));
}
