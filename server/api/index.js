const express = require('express');

const authApi = require('./auth');
const userApi = require('./user');
const overlay = require('./overlay');

const authMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();
api.use('/auth', authApi);
api.use('/user', authMiddleware, userApi);
api.use('/overlay', overlay);

module.exports = api;
