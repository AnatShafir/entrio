const userBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

const postUserBodySchema = {
  type: 'object',
  properties: {
    user: userBodySchema,
  },
  required: ['user'],
  additionalProperties: false,
};

const decimalWeightSchema = { type: 'number', maximum: 1, minimum: 0 };

const userSettingsSchema = {
  type: 'object',
  properties: {
    size: decimalWeightSchema,
    funding: decimalWeightSchema,
    age: decimalWeightSchema,
    userScoring: decimalWeightSchema,
  },
  additionalProperties: false,
};

const userSettingBodySchema = {
  type: 'object',
  properties: {
    settings: userSettingsSchema,
  },
  required: ['settings'],
  additionalProperties: false,
};

module.exports = { postUserBodySchema, userSettingBodySchema };
