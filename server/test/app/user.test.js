const request = require('supertest');

const app = require('../../src/app');

const generateUser = () => ({
  username: Math.random().toString(16),
  password: 'password',
});

describe('User', () => {
  const baseUrl = '/user';

  describe('POST user', () => {
    test('should respond with a 200 status code when passed a valid user', async () => {
      const body = { user: generateUser() };
      const response = await request(app).post(baseUrl).send(body);
      expect(response.statusCode).toBe(200);
    });
  });
});
