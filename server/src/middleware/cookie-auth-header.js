const { authCookieName } = require('../config');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  if (req.headers?.authorization) return next();
  if (!req.headers?.cookie) return next();

  const { cookie } = req.headers;
  const cookiesEntries = cookie.split('; ').map((cookieStr) => cookieStr.split('='));
  const [, authCookie] = cookiesEntries.find(([key]) => key === authCookieName);
  const logObject = logger.level === 'debug' ? { authCookie } : { authCookie: !!authCookie };
  logger.info('Adding cookie auth to headers', { ...logObject, reqId: req.reqId });
  req.headers.authorization = `Bearer ${authCookie}`;
  next();
};
