const express = require('express');
const multer = require('multer');
const OverlayImage = require('../models/OverlayImage');

const upload = multer({ dest: 'uploads/' });
const overlayRoutes = express.Router();

overlayRoutes.get('/', async (req, res) => {
  const overlayImages = await OverlayImage.find({ userID: req.user._id }).populate('userID');
  res.send(overlayImages);
});

overlayRoutes.post('/', upload.single('overlayImg'), async (req, res) => {
  console.log(req.file);
  const overlayImages = await OverlayImage.create({
    userID: req.user._id,
    title: 'Test 2',
    description: 'Test 2',
    img: 'aa.png',
  });
  res.send(overlayImages);
});

module.exports = overlayRoutes;
