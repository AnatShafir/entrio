const { validator } = require('../utils/validation');
const logger = require('../utils/logger');

module.exports = (schemaName) => (req, res, next) => {
  const validate = validator.getSchema(schemaName);
  if (!validate) throw new Error(`There is no validation function with schemaName: ${schemaName}`);
  logger.info('Validate request', { reqId: req.reqId, schemaName });
  if (!validate(req.body)) return res.status(400).json({ errors: validate.errors });
  next();
};
