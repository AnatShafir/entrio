module.exports = (logger) => (err, req, res, next) => {
  const { method, url, reqId } = req;
  const reqRoute = `${method}: ${url}`;
  logger.error('Internal server Error', { reqRoute, reqId, err });
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ message: 'Internal server Error' });
};
