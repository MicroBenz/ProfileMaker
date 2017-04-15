const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const overlayImageSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  img: String,
  slug: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
  collection: 'overlayImage',
});

const OverlayImage = mongoose.model('OverlayImage', overlayImageSchema);

module.exports = OverlayImage;
