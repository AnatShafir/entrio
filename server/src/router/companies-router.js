const express = require('express');

const authorize = require('../middleware/authorization');
const { getAllCompanies, postCompany, getCompanyScore } = require('../controllers/companies-controller');

const userPermitted = authorize('user', 'admin');
const companiesRouter = express.Router();

companiesRouter.get('/', getAllCompanies);
companiesRouter.get('/:id/score/:userId', getCompanyScore);
companiesRouter.post('/', postCompany);

module.exports = companiesRouter;
