/* eslint-disable consistent-return */
const { getObjectFromToken } = require('../utils/jwt');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { reqId } = req;
  const { authorization } = req.headers;
  logger.info('Authenticating Request', { reqId, authorization });
  if (!authorization) return res.status(401).json({ message: 'Unauthorized' });
  const [, token] = authorization.split(' ');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  getObjectFromToken(token, (err, user) => {
    if (err) return res.status(403).json({ message: err?.name || 'Forbidden' });
    req.user = user;
    next();
  });
};
