import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './pages/Landing.page';
import Explore from './pages/Explore.page';
import CreateOverlay from './pages/CreateOverlay.page';
import Result from './pages/Result.page';
import OverlayDetail from './pages/OverlayDetail.page';

const routes = [
  {
    path: '/',
    component: Landing,
    exact: true,
  },
  {
    path: '/explore',
    component: Explore,
  },
  {
    path: '/create-overlay',
    component: CreateOverlay,
  },
  {
    path: '/create-overlay/success',
    component: Result,
  },
  {
    path: '/view-overlay/:slug',
    component: OverlayDetail,
  },
];

export default () => (
  <div className="container" style={{ height: '100%', paddingTop: '55px' }}>
    {routes.map(route => (
      <Route
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ))}
  </div>
);
