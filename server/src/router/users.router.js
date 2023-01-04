const express = require('express');

const { postUser, patchUserSettings, postUserLogin } = require('../controllers/users.controller');
const authorize = require('../middleware/authorization.middleware');
const authenticateToken = require('../middleware/authentication.middleware');
const validate = require('../middleware/validation.middleware');

const usersRouter = express.Router();

usersRouter.post('/', validate('userBody'), postUser);
usersRouter.post('/login', validate('userBody'), postUserLogin);
usersRouter.patch(
  '/settings',
  authenticateToken,
  authorize('user', 'admin'),
  validate('settingsBody'),
  patchUserSettings,
);

module.exports = usersRouter;
