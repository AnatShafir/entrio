const Ajv = require('ajv');
const { postUserBodySchema, userSettingBodySchema } = require('../schemas/user.schema');
const { postCompanyBodySchema } = require('../schemas/company.schema');

const ajv = new Ajv();
ajv.addSchema(postUserBodySchema, 'userBody');
ajv.addSchema(userSettingBodySchema, 'settingsBody');
ajv.addSchema(postCompanyBodySchema, 'companyBody');

module.exports = { validator: ajv };
