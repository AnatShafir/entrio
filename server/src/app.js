const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

module.exports = app;
