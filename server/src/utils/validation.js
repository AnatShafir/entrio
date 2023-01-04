const Ajv = require('ajv');
const { postUserBodySchema, userSettingBodySchema } = require('../schemas/user.schema');

const ajv = new Ajv();
ajv.addSchema(postUserBodySchema, 'userBody');
ajv.addSchema(userSettingBodySchema, 'settingsBody');

module.exports = { validator: ajv };
