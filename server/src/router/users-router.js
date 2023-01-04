const express = require('express');

const {
  postUser, getUserById, patchUserSettings, postUserAuthenticate,
} = require('../controllers/users-controller');
const authorize = require('../middleware/authorization');

const userPermitted = authorize('user', 'admin');
const usersRouter = express.Router();

usersRouter.post('/', postUser);
usersRouter.post('/authenticate', postUserAuthenticate);
usersRouter.patch('/:id/settings', userPermitted, patchUserSettings);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
