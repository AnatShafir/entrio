const { getDB } = require('./db-client');

const insert = async (collectionName, objToInsert) => {
  const collection = getDB().collection(collectionName);
  return await collection.insert(objToInsert);
};

const findById = async (collectionName, _id) => {
  const collection = getDB().collection(collectionName);
  return await collection.findOne({ _id });
};

const updateById = async (collectionName, _id, updateObj) => {
  const collection = getDB().collection(collectionName);
  return await collection.updateOne({ _id }, { $set: updateObj });
};

module.exports = { insert, findById, updateById };
