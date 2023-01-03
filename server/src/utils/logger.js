const pino = require('pino');
const { logLevel } = require('../config');

const logger = pino({
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
});

module.exports = logger;
