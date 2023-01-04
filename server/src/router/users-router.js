const express = require('express');

const { postUser, patchUserSettings, postUserLogin } = require('../controllers/users-controller');
const authorize = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');

const usersRouter = express.Router();

usersRouter.post('/', postUser);
usersRouter.post('/login', postUserLogin);
usersRouter.patch('/:id/settings', authenticateToken, authorize('user', 'admin'), patchUserSettings);

module.exports = usersRouter;
