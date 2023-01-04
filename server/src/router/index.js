const express = require('express');

const companiesRouter = require('./companies.router');
const usersRouter = require('./users.router');
const defaultSettingsRouter = require('./default-settings.router');

const router = express.Router();
const defaultRoute = (_, res) => res.status(404).json({ message: 'Not Found' });

router.use('/company', companiesRouter);
router.use('/user', usersRouter);
router.use('/default-settings', defaultSettingsRouter);
router.use('*', defaultRoute);

module.exports = router;
