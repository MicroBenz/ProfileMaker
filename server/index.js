const express = require('express');
const multer = require('multer');
const api = require('./api');

const app = express();

app.use('/api/', api);

app.listen(3000, () => { console.log('ProfileMaker API Listening on 3000')});
