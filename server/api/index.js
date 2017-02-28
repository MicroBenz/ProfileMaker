const express = require('express');
const testApi = require('./test');

const api = express.Router();
api.use('/test', testApi);

module.exports = api;
