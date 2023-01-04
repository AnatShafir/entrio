const express = require('express');

const { postUser, patchUserSettings, postUserLogin } = require('../controllers/users.controller');
const authorize = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');
const validate = require('../middleware/validation');

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
