import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h1>Landing</h1>
    <Link to="/create-overlay">Make one</Link>
    <Link to="/explore">Or explore</Link>
  </div>
);
