const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

const api = require('./api');
const authConfigs = require('./configs/auth');
// Setup Passport authen
passport.use('facebook-token', new FacebookTokenStrategy({
  clientID: authConfigs.FACEBOOK_ID,
  clientSecret: authConfigs.FACEBOOK_SECRET,
  // callbackURL: authConfigs.FACEBOOK_CALLBACK,
}, (token, refreshToken, profile, done) => {
  console.log('middleware');
  console.log(profile, token, refreshToken);
  return done(null, { test: 'hi' });
}));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/api/', api);

app.listen(3000, () => {
  console.log('ProfileMaker API Listening on 3000');
});
