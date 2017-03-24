/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import CompA from './pages/A';
import CompB from './pages/B';

const routes = [
  {
    path: '/',
    component: Landing,
    exact: true,
  },
  {
    path: '/a',
    component: CompA,
  },
  {
    path: '/b',
    component: CompB,
  },
];

export default () => (
  <div>
    {routes.map((route, i) => (
      <Route
        key={i}
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ))}
  </div>
);
