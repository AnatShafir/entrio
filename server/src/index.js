require('dotenv').config();

const app = require('./app');
const { db: dbConfig, port } = require('./config');
const { connectDB, closeDB } = require('./db/db-client');
const dbInit = require('./db/db-init');
const logger = require('./utils/logger');

let server;

const start = async () => {
  logger.info('Connecting to the DB...', dbConfig);
  await connectDB(dbConfig);
  logger.info('Db connected successfully');
  await dbInit();
  server = app.listen(port, () => {
    logger.info(`App is listening on port: ${port}`, server.address());
  });
};

const shutDown = async (signal) => {
  try {
    if (signal) logger.info('Received signal to terminate', { signal });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);

    await closeDB(dbConfig);
    logger.info('DB closed successfully');
    if (!server) process.exit(0);
    server.close(() => {
      logger.info('Server closed successfully');
      process.exit(0);
    });
  } catch (error) {
    logger?.error(error);
    process.exit(1);
  }
};

process.once('SIGTERM', shutDown);
process.once('SIGINT', shutDown);

start().catch((error) => {
  logger?.error('Something happened, close gracefully', error);
  shutDown();
});
