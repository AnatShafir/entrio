const express = require('express');

const { getDefaultSettings, putDefaultSettings } = require('../controllers/default-settings-controller');
const authorize = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');

const defaultSettingsRouter = express.Router();
const adminAuthorize = authorize('admin');

defaultSettingsRouter.get('/', authenticateToken, adminAuthorize, getDefaultSettings);
defaultSettingsRouter.put('/', authenticateToken, adminAuthorize, putDefaultSettings);

module.exports = defaultSettingsRouter;
