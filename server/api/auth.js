const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authRoutes = express.Router();

authRoutes.get('/facebook/login',
  passport.authenticate('facebook-token', { session: false }),
  async (req, res) => {
    const { id, name, photos } = req.user;
    let user = await User.findOne({ facebookID: id });
    if (user === null) {
      user = await User.create({
        firstName: name.givenName,
        lastName: name.familyName,
        facebookID: id,
        profileImage: photos[0].value,
      });
    }
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    return res.send({ token });
  });

module.exports = authRoutes;
