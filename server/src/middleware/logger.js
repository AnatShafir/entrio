const crypto = require('crypto');

module.exports = (logger) => (req, res, next) => {
  const reqId = crypto.randomUUID();
  const reqInfo = {
    method: req.method,
    url: req.url,
    params: req.params,
    body: req.body,
    reqId,
  };

  logger.info('Received request', reqInfo);

  res.on('finish', () => {
    const { statusCode } = res;
    const reqRoute = `${reqInfo.method}: ${reqInfo.url}`;
    logger.info('Sent response', { reqRoute, reqId, statusCode });
  });

  next();
};
