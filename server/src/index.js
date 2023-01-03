const app = require('./app');
const { db: dbConfig, port } = require('./config');
const { connectDB } = require('./db/db-client');
const logger = require('./utils/logger');

const start = async () => {
  await connectDB(dbConfig);
  app.listen(port, () => {
    logger.info(`App is listening on port: ${port}`);
  });
};

start();
