const { insert, updateById, findById } = require('../db/db-functions');
const { defaultSettings } = require('../config');

const collectionName = 'users';

const postUser = async (req, res) => {
  let user = req.body;
  user = { ...user, settings: defaultSettings, role: 'user' };
  const result = await insert(collectionName, user);
  res(result);
};

const putUser = async (req, res) => {
  const userId = req.params.id;
  const updateObj = req.body;
  const result = await updateById(collectionName, userId, updateObj);
  res(result);
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const result = await findById(collectionName, userId);
  res(result);
};

module.exports = { postUser, putUser, getUserById };
