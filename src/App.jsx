import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import AppRoutes from './routes';
import Nav from './components/nav/Nav';
import './App.scss';

const App = ({ isCompleteAuthFlow }) => {
  if (!isCompleteAuthFlow) {
    return (
      <div className="ball-pulse" style={{ width: '100%', height: '100%' }}>
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
        <div style={{ backgroundColor: 'red' }} />
      </div>
    )
  }
  return (
    <Router>
      <div style={{ width: '100%', height: '100%' }}>
        <Nav />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default connect(
  ({ auth }) => ({
    isCompleteAuthFlow: auth.isCompleteAuthFlow,
  }),
)(App);
