const { findDefaultSettings, updateDefaultSettings } = require('../collections/default-settings-collection');

const getDefaultSettings = async (_, res, next) => {
  try {
    const settings = await findDefaultSettings();
    res.status(200).json({ settings });
  } catch (error) {
    next(error);
  }
};

const putDefaultSettings = async (req, res, next) => {
  try {
    const { settingsUpdate } = req.body;
    await updateDefaultSettings(settingsUpdate);
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDefaultSettings, putDefaultSettings };
