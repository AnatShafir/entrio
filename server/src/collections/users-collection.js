const { defaultSettings } = require('../config');
const getDBFunctions = require('../db/db-functions');

const collectionName = 'users';
const {
  updateById, insert, findById, findByName,
} = getDBFunctions(collectionName);

const insertUser = async (user) => {
  const { username, password } = user;
  const existingUser = await findByName(username);
  if (existingUser) throw new Error('Conflict');
  else {
    const formattedUser = {
      username, password, settings: defaultSettings, role: 'user',
    };
    return await insert(formattedUser);
  }
};

const findUserById = async (userId) => await findById(userId);

const authenticateUser = async (userInfo) => {
  const user = await findByName(userInfo.username);
  if (user && userInfo.password === user.password) {
    const { username, role, settings } = user;
    return { username, role, settings };
  } throw new Error('Unauthorized');
};

const isUpdateForbidden = async (userId, settings) => {
  const user = await findUserById(userId);
  return user.role !== 'admin' && settings.userScoringAvg;
};

const validateSettings = (settings) => {
  const sumOfWeights = Object.entries(settings).reduce((a, b) => a + b, 0);
  return sumOfWeights === 1;
};

const updateUserSettingsById = async (_id, settings) => {
  const updateForbidden = await isUpdateForbidden(_id, settings);
  if (updateForbidden || !validateSettings(settings)) throw new Error('Forbidden');
  return await updateById(_id, { settings });
};

module.exports = {
  updateUserSettingsById, insertUser, findUserById, authenticateUser,
};
