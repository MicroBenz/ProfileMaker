const express = require('express');

const testRoutes = express.Router();

testRoutes
  .route('/')
  .get((req, res) => {
    res.send('This is GET test');
  })
  .post((req, res) => {
    res.send('This is POST test');    
  })
  .put((req, res) => {
    res.send('This is PUT test');        
  })
  .delete((req, res) => {
    res.send('This is DELETE test')
  });

module.exports = testRoutes;
