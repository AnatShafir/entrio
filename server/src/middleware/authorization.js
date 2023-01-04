const logger = require('../utils/logger');

module.exports = (...permittedRoles) => (req, res, next) => {
  const { user, reqId } = req;
  logger.info('Authorizing Request', { reqId, user });
  if (user && permittedRoles.includes(user.role)) return next();
  res.status(403).json({ message: 'Forbidden' });
};
