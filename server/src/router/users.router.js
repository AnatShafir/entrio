const express = require('express');

const { postUser, putUserSettings, postUserLogin } = require('../controllers/users.controller');
const authorize = require('../middleware/authorization.middleware');
const authenticateToken = require('../middleware/authentication.middleware');
const validate = require('../middleware/validation.middleware');

const usersRouter = express.Router();

usersRouter.post('/', validate('userBody'), postUser);
usersRouter.post('/login', validate('userBody'), postUserLogin);
usersRouter.put(
  '/settings',
  authenticateToken,
  authorize('user', 'admin'),
  validate('settingsBody'),
  putUserSettings,
);

module.exports = usersRouter;
