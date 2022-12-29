const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config');

const app = express();
app.use(bodyParser.json());

module.exports = () => app.listen(port, () => console.log(`App listening on port ${port}`));
