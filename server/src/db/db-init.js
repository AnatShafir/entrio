const { initDefaultSettingsCollection } = require('../collections/default-settings.collection');
const { initAdminUser } = require('../collections/users.collection');

module.exports = async () => {
  await initDefaultSettingsCollection();
  await initAdminUser();
};
