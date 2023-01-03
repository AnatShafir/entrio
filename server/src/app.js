const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');
const logHttp = require('./middleware/logger');
const logger = require('./utils/logger');

const app = express();
app.use(bodyParser.json());
app.use(logHttp(logger));
app.use(cors());
app.use('/', router);

module.exports = app;
