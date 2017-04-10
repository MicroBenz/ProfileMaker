const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authRoutes = express.Router();

authRoutes.get('/facebook/login',
  passport.authenticate('facebook-token', { session: false }),
  async (req, res) => {
    console.log(req.user);
    const { id, name, photos } = req.user;
    let user = await User.findOne({ facebookID: id });
    if (user !== null) {
      // return JWT Token using user data
      console.log('user found');
      console.log(user);
      // return res.send({ token });
    }
    else {
      // Create new user
      user = await User.create({
        firstName: name.givenName,
        lastName: name.familyName,
        facebookID: id,
        profileImage: photos[0].value,
      });
      console.log('create user');
      console.log(user);
      // return res.send(newUser);
    }
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    return res.send({ token });
  });

module.exports = authRoutes;
