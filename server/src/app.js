const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const logHttp = require('./middleware/logger');
const addReqId = require('./middleware/add-request-id');
const errorHandler = require('./middleware/error-handler');
const cookieAuthHeader = require('./middleware/cookie-auth-header');

const router = require('./router');
const logger = require('./utils/logger');
const { corsOptions } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(addReqId);
app.use(logHttp(logger));
app.use(cookieAuthHeader);
app.use(cors(corsOptions));
app.use('/', router);
app.use(errorHandler(logger));

module.exports = app;
