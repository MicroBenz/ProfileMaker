import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'minireset.css';
import 'font-awesome/css/font-awesome';

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
      render(App)
    });
  }
}

else {
  ReactDOM.render(<App />, document.getElementById('apps'));
}
