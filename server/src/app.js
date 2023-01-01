const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port } = require('./config');
const router = require('./router');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

module.exports = () => app.listen(port, () => console.log(`App listening on port ${port}`));
