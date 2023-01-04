const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, tokenExpiresIn: expiresIn } = require('../config');

const generateToken = (obj) => jwt.sign(obj, TOKEN_SECRET, { expiresIn });

module.exports = { generateToken };
