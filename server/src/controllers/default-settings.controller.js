const logger = require('../utils/logger');
const { findDefaultSettings, updateDefaultSettings } = require('../collections/default-settings.collection');

const getDefaultSettings = async (req, res, next) => {
  try {
    const { reqId } = req;
    logger.info('Finding default settings...', { reqId });
    const settings = await findDefaultSettings();
    logger.info('Default settings found successfully', { reqId, settings });
    res.status(200).json({ settings });
  } catch (error) {
    next(error);
  }
};

const putDefaultSettings = async (req, res, next) => {
  try {
    const { reqId } = req;
    const { settings } = req.body;
    logger.info('Updating default settings...', { reqId, settings });
    await updateDefaultSettings(settings);
    logger.info('Default settings updated successfully', { reqId, settings });
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDefaultSettings, putDefaultSettings };
