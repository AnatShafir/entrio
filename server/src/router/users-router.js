const express = require('express');

const { postUser, patchUserSettings, postUserAuthenticate } = require('../controllers/users-controller');
const authorize = require('../middleware/authorization');

const userPermitted = authorize('user', 'admin');
const usersRouter = express.Router();

usersRouter.post('/', postUser);
usersRouter.post('/authenticate', postUserAuthenticate);
usersRouter.patch('/:id/settings', userPermitted, patchUserSettings);

module.exports = usersRouter;
