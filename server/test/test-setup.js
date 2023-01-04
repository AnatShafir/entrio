const dotenv = require('dotenv');

dotenv.config({ path: 'test/test.env' });

const { connectDB, closeDB } = require('../src/db/db-client');
const { db: dbConfig } = require('./test-config');

beforeAll(async () => {
  jest.setTimeout(300); // Fail fast when there is no connection
  await connectDB(dbConfig);
});

afterAll(async () => await closeDB());
