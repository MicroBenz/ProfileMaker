const express = require('express');

// const authApi = require('./auth');
// const userApi = require('./user');
// const overlay = require('./overlay');

const authMiddleware = require('../middlewares/auth.middleware');

const api = express.Router();
api.use('/auth', require('./auth'));
api.use('/users', authMiddleware, require('./user'));
api.use('/overlay', require('./overlay'));

module.exports = api;
