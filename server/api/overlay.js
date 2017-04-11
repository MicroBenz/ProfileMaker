const express = require('express');
const multer = require('multer');
const { resolve } = require('path');
const slug = require('slug');
const OverlayImage = require('../models/OverlayImage');

const authMiddleware = require('../middlewares/auth.middleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const { mimetype, originalname } = file;
    if (mimetype !== 'image/png') {
      cb({ errorMessage: 'API Doesn\'t support non-png file type for overlay.' }, null);
    }
    const fileName = originalname.split('.png')[0];
    cb(null, `${fileName}-${Date.now()}.png`);
  },
});
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });
const overlayRoutes = express.Router();

overlayRoutes.get('/', async (req, res) => {
  const overlayImages = await OverlayImage.find().populate('userID');
  res.send(overlayImages);
});

overlayRoutes.post('/', authMiddleware, upload.single('overlayImg'), async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  const { title, description } = req.body;
  // const imgPath = '';
  const overlayImages = await OverlayImage.create({
    userID: req.user._id,
    title,
    description,
    img: req.file.filename,
    slug: slug(title),
  });
  console.log(overlayImages);
  res.send(overlayImages);
});

overlayRoutes.get('/:filename', (req, res) => {
  res.sendFile(resolve(__dirname, `../uploads/${req.params.filename}`));
});
module.exports = overlayRoutes;
