const express = require('express');
const multer = require('multer');
const slug = require('slug');
const utf8 = require('utf8');
const { resolve } = require('path');
const OverlayImage = require('../models/OverlayImage');

const authMiddleware = require('../middlewares/auth.middleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const { mimetype, originalname } = file;
    if (mimetype !== 'image/png') {
      cb({ errorMessage: 'API Doesn\'t support non-png file type for overlay.' }, null);
    }
    const fileName = originalname.split('.png')[0];
    cb(null, `${fileName}-${Date.now()}.png`);
  },
});
const upload = multer({ storage });
const overlayRoutes = express.Router();

overlayRoutes.get('/', async (req, res) => {
  const overlayImages = await OverlayImage.find().populate('userID');
  res.send(overlayImages);
});

overlayRoutes.post('/', authMiddleware, upload.single('overlayImg'), async (req, res) => {
  const { title, description } = req.body;
  try {
    const overlayImages = await OverlayImage.create({
      userID: req.user._id,
      title,
      description,
      img: req.file.filename,
      slug: slug(utf8.encode(title)),
    });
    res.send(overlayImages);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

overlayRoutes.get('/:slug', async (req, res) => {
  const { slug: reqSlug } = req.params;
  const overlayImage = await OverlayImage.findOne({ slug: reqSlug });
  res.send(overlayImage);
});

overlayRoutes.get('/image/:filename', (req, res) => {
  res.sendFile(resolve(__dirname, `../uploads/${req.params.filename}`));
});

module.exports = overlayRoutes;
