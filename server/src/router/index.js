const express = require('express');

const companiesRouter = require('./companies-router');
const usersRouter = require('./users-router');

const router = express.Router();
router.use('/company', companiesRouter);
router.use('/user', usersRouter);

module.exports = router;
