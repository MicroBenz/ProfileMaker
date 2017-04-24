const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();
api.use('/auth', require('./auth'));
api.use('/users', authMiddleware, require('./user'));
api.use('/overlay', require('./overlay'));

module.exports = api;
