/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import A from './pages/A';
import B from './pages/B';

const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/a',
    component: A,
  },
  {
    path: '/b',
    component: B,
  },
];

export default () => (
  <Router>
    <div>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          component={route.component}
        />
      ))}
    </div>
  </Router>
);
