const positiveIntegerSchema = { type: 'number', minimum: 0, multipleOf: 1 };
const companyBodySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    size: positiveIntegerSchema,
    funding: positiveIntegerSchema,
    age: positiveIntegerSchema,
  },
  required: ['name', 'size', 'funding', 'age'],
  additionalProperties: false,
};

const postCompanyBodySchema = {
  type: 'object',
  properties: {
    company: companyBodySchema,
  },
  required: ['company'],
  additionalProperties: false,
};

module.exports = { postCompanyBodySchema };
