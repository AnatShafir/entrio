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

module.exports = { postUserBodySchema };
