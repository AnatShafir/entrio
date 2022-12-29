const express = require('express');

const { postUser, putUser, getUserById } = require('../controllers/users-controller');

const usersRouter = express.Router();
usersRouter.post('/', postUser);
usersRouter.put('/:id', putUser);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
