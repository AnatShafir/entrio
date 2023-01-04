const Ajv = require('ajv');
const { postUserBodySchema } = require('../schemas/user.schema');

const ajv = new Ajv();
ajv.addSchema(postUserBodySchema, 'postUserBody');

module.exports = { validator: ajv };
