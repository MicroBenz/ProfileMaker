const express = require('express');
const authApi = require('./auth');

const api = express.Router();
api.use('/auth', authApi);

module.exports = api;
