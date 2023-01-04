const logger = require('../utils/logger');

module.exports = (...permittedRoles) => (req, res, next) => {
  const { user, reqId } = req;
  const { id: idParam } = req.params;
  logger.info('Authorizing Request', { reqId, user, idParam });
  if (user && permittedRoles.includes(user.role) && user._id === idParam) return next();
  res.status(403).json({ message: 'Forbidden' });
};
