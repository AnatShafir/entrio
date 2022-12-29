const express = require('express');

const {
  postUser, getUserById, patchUserSettings,
} = require('../controllers/users-controller');

const usersRouter = express.Router();
usersRouter.post('/', postUser);
usersRouter.patch('/:id/settings', patchUserSettings);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
