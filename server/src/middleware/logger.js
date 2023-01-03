module.exports = (logger) => (req, res, next) => {
  const reqInfo = {
    method: req.method,
    url: req.url,
    params: req.params,
    body: req.body,
    reqId: req?.reqId,
  };

  logger.info('Received request', reqInfo);

  res.on('finish', () => {
    const { statusCode } = res;
    const { method, url, reqId } = reqInfo;
    const reqRoute = `${method}: ${url}`;
    logger.info('Sent response', { reqRoute, reqId, statusCode });
  });

  next();
};
