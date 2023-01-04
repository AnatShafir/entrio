module.exports = (logger) => (err, req, res, next) => {
  const { method, url, reqId } = req;
  const reqRoute = `${method}: ${url}`;

  const status = err.statusCode ?? 500;
  const message = status < 500 ? err.message : 'Internal server Error';
  logger.error(message, { reqRoute, reqId, err });
  if (res.headersSent) {
    return next(err);
  }
  return res.status(status).json({ message });
};
