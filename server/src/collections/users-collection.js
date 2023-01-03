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
    const {
      _id, username, role, settings,
    } = user;
    return {
      _id, username, role, settings,
    };
  } throw new Error('Unauthorized');
};

const isUpdateForbidden = async (userId, settingsUpdate) => {
  const user = await findUserById(userId);
  return user?.role !== 'admin' && settingsUpdate.userScoringAvg;
};

const validateSettings = (settings) => {
  const sumOfWeights = Object.values(settings).reduce((a, b) => +(a + b).toFixed(2), 0);
  return sumOfWeights === 1;
};

const updateUserSettingsById = async (userId, settingsUpdate) => {
  const updateForbidden = await isUpdateForbidden(userId, settingsUpdate);
  const newSettings = { ...defaultSettings, ...settingsUpdate };
  if (updateForbidden || !validateSettings(newSettings)) throw new Error('Forbidden');
  return await updateById(userId, { settings: newSettings });
};

module.exports = {
  updateUserSettingsById, insertUser, findUserById, authenticateUser,
};
