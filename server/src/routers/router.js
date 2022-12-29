const companiesRouter = require('./companies-router');

module.exports = (app) => {
  app.use('/company', companiesRouter);
};
