import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './pages/Landing.page';
import Explore from './pages/Explore.page';
import CreateOverlay from './pages/CreateOverlay.page';
import Result from './pages/Result.page';
import OverlayDetail from './pages/OverlayDetail.page';
import CreateProfileImage from './pages/CreateProfileImage.page';

const routes = [
  {
    path: '/',
    component: Landing,
    exact: true,
  },
  {
    path: '/explore',
    component: Explore,
    exact: true,
  },
  {
    path: '/explore/:slug',
    component: OverlayDetail,
    exact: true,
  },
  {
    path: '/create-overlay',
    component: CreateOverlay,
    exact: true,
  },
  {
    path: '/create-overlay/success',
    component: Result,
    exact: true,
  },
  {
    path: '/create-profile-image/:slug',
    component: CreateProfileImage,
    exact: true,
  },
];

export default () => (
  <div style={{ height: '100%', paddingTop: '53px' }}>
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
