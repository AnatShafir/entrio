const { MongoClient } = require('mongodb');

let client;
let db;

const connectDB = async (dbConfig) => {
  client = new MongoClient(dbConfig.url);
  await client.connect();
  db = client.db(dbConfig.dbName);
};

const closeDB = async () => await client?.close();

const getDB = () => {
  if (!db) throw new Error('DB is not connected');
  else return db;
};

module.exports = { connectDB, closeDB, getDB };
