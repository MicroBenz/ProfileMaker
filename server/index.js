const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
require('dotenv').config();

const api = require('./api');

// Setup Passport authen
passport.use('facebook-token', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
}, (token, refreshToken, profile, done) => {
  console.log('middleware');
  console.log(profile, token, refreshToken);
  return done(null, profile);
}));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/', api);

app.listen(3000, () => {
  console.log('ProfileMaker API Listening on 3000');
});
