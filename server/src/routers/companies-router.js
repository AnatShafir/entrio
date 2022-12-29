const express = require('express');

const { getCompanyById } = require('../controllers/companies-controller');

const companiesRouter = express.Router();

companiesRouter.get('/:id', getCompanyById);

module.exports = companiesRouter;
