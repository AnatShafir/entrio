module.exports = (logger) => (err, req, res, next) => {
  const { method, url, reqId } = req;
  const reqRoute = `${method}: ${url}`;

  const status = err.statusCode ?? 500;
  const isServerError = status >= 500;
  const message = isServerError ? 'Internal server Error' : err.message;
  if (isServerError) logger.error(message, { reqRoute, reqId, err });
  else logger.info(`User error: ${message}`, { reqRoute, reqId, err });

  if (res.headersSent) {
    return next(err);
  }
  return res.status(status).json({ message });
};
