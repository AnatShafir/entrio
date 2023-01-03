const app = require('./app');
const { db: dbConfig, port } = require('./config');
const { connectDB } = require('./db/db-client');
const logger = require('./utils/logger');

const start = async () => {
  logger.info('Connecting to the DB...', dbConfig);
  await connectDB(dbConfig);
  logger.info('Db connected successfully');
  const server = app.listen(port, () => {
    logger.info(`App is listening on port: ${port}`, server.address());
  });
};

start();
