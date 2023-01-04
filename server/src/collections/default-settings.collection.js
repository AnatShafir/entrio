const getDBFunctions = require('../db/db-functions');
const { defaultSettings } = require('../config');

const collectionName = 'default-settings';
const { findAll, insert, updateAll } = getDBFunctions(collectionName);

const findDefaultSettings = async () => {
  const [settings] = await findAll();
  delete settings._id;
  return settings;
};

const initDefaultSettingsCollection = async () => {
  const settings = await findDefaultSettings();
  if (!settings) await insert(defaultSettings);
};

const updateDefaultSettings = async (updateObj) => await updateAll(updateObj);

module.exports = { findDefaultSettings, initDefaultSettingsCollection, updateDefaultSettings };
