const express = require('express');

const authApi = require('./auth');
const userApi = require('./user');

const authMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();
api.use('/auth', authApi);
api.use('/user', authMiddleware, userApi);

module.exports = api;
