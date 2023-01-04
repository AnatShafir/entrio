const { ObjectId } = require('mongodb');

const { getDB } = require('./db-client');

const insertFunc = (collectionName) => async (objToInsert) => {
  const collection = getDB().collection(collectionName);
  return await collection.insertOne(objToInsert);
};

const findByIdFunc = (collectionName) => async (id) => {
  const collection = getDB().collection(collectionName);
  return await collection.findOne({ _id: ObjectId(id) });
};

const findByNameFunc = (collectionName) => async (username) => {
  const collection = getDB().collection(collectionName);
  return await collection.findOne({ username });
};

const findAllFunc = (collectionName) => async (filterObject) => {
  const collection = getDB().collection(collectionName);
  return await collection.find(filterObject).toArray();
};

const updateByIdFunc = (collectionName) => async (id, updateObj) => {
  const collection = getDB().collection(collectionName);
  return await collection.updateOne({ _id: ObjectId(id) }, { $set: updateObj });
};

const updateAllFunc = (collectionName) => async (updateObj) => {
  const collection = getDB().collection(collectionName);
  return await collection.updateMany({ }, { $set: updateObj });
};

const getDBFunctions = (collectionName) => ({
  insert: insertFunc(collectionName),
  findById: findByIdFunc(collectionName),
  findAll: findAllFunc(collectionName),
  updateById: updateByIdFunc(collectionName),
  findByName: findByNameFunc(collectionName),
  updateAll: updateAllFunc(collectionName),
});

module.exports = getDBFunctions;
