const startApp = require('./app');
const { connectDB } = require('./db-interface');
const { db: dbConfig } = require('./config');

const start = async () => {
  await connectDB(dbConfig);
  startApp();
};

start();
