const express = require('express');

const { getDefaultSettings, putDefaultSettings } = require('../controllers/default-settings.controller');
const authorize = require('../middleware/authorization.middleware');
const authenticateToken = require('../middleware/authentication.middleware');
const validate = require('../middleware/validation.middleware');

const defaultSettingsRouter = express.Router();

defaultSettingsRouter.get('/', authenticateToken, authorize('admin'), getDefaultSettings);
defaultSettingsRouter.put(
  '/',
  authenticateToken,
  authorize('admin'),
  validate('settingsBody'),
  putDefaultSettings,
);

module.exports = defaultSettingsRouter;
