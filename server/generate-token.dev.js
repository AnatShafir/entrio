const token = require('crypto').randomBytes(64).toString('hex');

// eslint-disable-next-line no-console
console.log(`TOKEN_SECRET=${token}`);
