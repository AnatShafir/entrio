const express = require('express');

const authorize = require('../middleware/authorization');
const { getAllCompanies, postCompany, getCompanyScore } = require('../controllers/companies-controller');

const companiesRouter = express.Router();

companiesRouter.get('/', getAllCompanies);
companiesRouter.post('/', postCompany);
companiesRouter.get('/:id/score/', authorize('user', 'admin'), getCompanyScore);

module.exports = companiesRouter;
