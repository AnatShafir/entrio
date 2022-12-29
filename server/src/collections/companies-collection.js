const { getDB } = require('../db-interface');

const collectionName = 'companies';

const insert = async (company) => await getDB().collection(collectionName).insert(company);
const findById = async (_id) => await getDB().collection(collectionName).findOne({ _id });

module.exports = { insert, findById };
