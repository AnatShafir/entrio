const { connectDB, closeDB } = require('../src/db/db-client');
const { db: dbConfig } = require('./test-config');

beforeAll(async () => await connectDB(dbConfig));

afterAll(async () => await closeDB());
