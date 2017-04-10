const FacebookStrategy = require('passport-facebook').Strategy;
const authConfigs = require('./auth');

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: authConfigs.FACEBOOK_ID,
    clientSecret: authConfigs.FACEBOOK_SECRET,
    callbackURL: authConfigs.FACEBOOK_CALLBACK,
  }, (token, refreshToken, profile, done) => {
    console.log(profile, token, refreshToken);
    return done(null, { test: 'hi' });
  }));
};
