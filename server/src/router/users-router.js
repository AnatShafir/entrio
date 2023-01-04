const express = require('express');

const { postUser, patchUserSettings, postUserAuthenticate } = require('../controllers/users-controller');
const authorize = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');

const usersRouter = express.Router();

usersRouter.post('/', postUser);
usersRouter.post('/authenticate', postUserAuthenticate);
usersRouter.patch('/:id/settings', authenticateToken, authorize('user', 'admin'), patchUserSettings);

module.exports = usersRouter;
