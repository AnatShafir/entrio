const { getDB } = require('./db-client');

const insertFunc = (collectionName) => async (objToInsert) => {
  const collection = getDB().collection(collectionName);
  return await collection.insert(objToInsert);
};

const findByIdFunc = (collectionName) => async (_id) => {
  const collection = getDB().collection(collectionName);
  return await collection.findOne({ _id });
};

const updateByIdFunc = (collectionName) => async (_id, updateObj) => {
  const collection = getDB().collection(collectionName);
  return await collection.updateOne({ _id }, { $set: updateObj });
};

const getDBFunctions = (collectionName) => ({
  insert: insertFunc(collectionName),
  findById: findByIdFunc(collectionName),
  updateById: updateByIdFunc(collectionName),
});

module.exports = getDBFunctions;
