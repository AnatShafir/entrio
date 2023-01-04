const token = require('crypto').randomBytes(64).toString('hex');

console.log(`TOKEN_SECRET=${token}`);
