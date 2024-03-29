const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  facebookID: {
    type: String,
    unique: true,
  },
  profileImage: String,
}, {
  timestamps: true,
  collection: 'users',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
