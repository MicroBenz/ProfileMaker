const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/me', (req, res) => {
  res.send(req.user);
});

module.exports = userRoutes;
