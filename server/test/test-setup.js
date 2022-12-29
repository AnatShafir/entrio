const { connectDB, closeDB } = require('../src/db-interface');
const { db: dbConfig } = require('./test-config');

beforeAll(async () => await connectDB(dbConfig));

afterAll(async () => await closeDB());
