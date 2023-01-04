const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, tokenExpiresIn: expiresIn } = require('../config');

const generateToken = (object) => jwt.sign(object, TOKEN_SECRET, { expiresIn });
const getObjectFromToken = (token, callback) => jwt.verify(token, TOKEN_SECRET, callback);

module.exports = { generateToken, getObjectFromToken };
