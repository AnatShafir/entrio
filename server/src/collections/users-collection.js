const { defaultSettings } = require('../config');
const getDBFunctions = require('../db/db-functions');

const collectionName = 'users';
const { updateById, insert, findById } = getDBFunctions(collectionName);

const insertUser = async (user) => {
  const formattedUser = { ...user, settings: defaultSettings, role: 'user' };
  return await insert(formattedUser);
};

const findUserById = async (userId) => await findById(userId);

const isUpdateForbidden = async (userId, settings) => {
  const user = await findUserById(userId);
  return user.role !== 'admin' && settings.userScoringAvg;
};

const verifySettings = (settings) => {
  const sumOfWeights = Object.entries(settings).reduce((a, b) => a + b, 0);
  return sumOfWeights === 1;
};

const updateUserSettingsById = async (_id, settings) => {
  const updateForbidden = await isUpdateForbidden(_id, settings);
  if (updateForbidden || !verifySettings(settings)) throw new Error('Forbidden');
  return await updateById(_id, { settings });
};

module.exports = {
  updateUserSettingsById, insertUser, findUserById,
};
