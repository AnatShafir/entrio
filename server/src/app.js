const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port } = require('./config');
const logger = require('./utils/logger');
const router = require('./router');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

module.exports = () => app.listen(port, () => logger.info(`App listening on port ${port}`));
