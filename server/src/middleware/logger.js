module.exports = (logger) => (req, res, next) => {
  const reqInfo = {
    method: req.method,
    url: req.url,
    body: req.body,
    reqId: req?.reqId,
  };

  logger.info('Received request', reqInfo);
  logger.debug('Received request', req);

  res.on('finish', () => {
    const { statusCode, statusMessage } = res;
    const { method, url, reqId } = reqInfo;
    const reqRoute = `${method}: ${url}`;
    logger.info('Sent response', {
      reqRoute, reqId, statusCode, statusMessage,
    });
  });

  next();
};
