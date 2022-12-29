const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config');
const loadRouter = require('./routers/router');

const app = express();
app.use(bodyParser.json());
loadRouter(app);

module.exports = () => app.listen(port, () => console.log(`App listening on port ${port}`));
