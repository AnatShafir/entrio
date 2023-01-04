const crypto = require('crypto');

module.exports = (req, res, next) => {
  const reqId = crypto.randomUUID();
  req.reqId = reqId;
  next();
};
