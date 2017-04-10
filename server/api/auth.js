const express = require('express');
const passport = require('passport');

const authRoutes = express.Router();

authRoutes.get('/facebook/login', passport.authenticate('facebook-token', { session: false }), (req, res) => {
  console.log(req.user);
  res.send('success');
});

module.exports = authRoutes;
