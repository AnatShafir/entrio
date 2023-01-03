module.exports = (logger) => (req, res, next) => {
  const { method, url, params } = req;
  logger.info('Received request', { method, url, params });

  res.on('finish', () => {
    const { statusCode } = res;
    logger.info('Sent response', {
      method, url, params, statusCode,
    });
  });
  next();
};
