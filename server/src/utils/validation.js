const Ajv = require('ajv');
const { postUserBodySchema } = require('../schemas/user.schema');

const ajv = new Ajv();
ajv.addSchema(postUserBodySchema, 'userBody');

module.exports = { validator: ajv };
