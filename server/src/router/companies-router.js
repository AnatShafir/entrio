const express = require('express');

const { getCompanyById, postCompany, getCompanyScore } = require('../controllers/companies-controller');
const authorize = require('../middleware/authorization.js');

const userPermitted = authorize('user', 'admin');
const companiesRouter = express.Router();

companiesRouter.get('/:id', userPermitted, getCompanyById);
companiesRouter.get('/:id/score', userPermitted, getCompanyScore);
companiesRouter.post('/', userPermitted, postCompany);

module.exports = companiesRouter;
