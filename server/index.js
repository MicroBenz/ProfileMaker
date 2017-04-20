const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_HOST);
mongoose.Promise = global.Promise;

// Setup Passport authen
passport.use('facebook-token', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
}, (token, refreshToken, profile, done) => done(null, profile)));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

app.use('/api/', require('./api'));

app.listen(process.env.PORT, () => {
  console.log('ProfileMaker API Listening on 3000');
});
