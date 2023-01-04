const express = require('express');

const authorize = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');
const { getAllCompanies, postCompany, getCompanyScore } = require('../controllers/companies-controller');

const companiesRouter = express.Router();

companiesRouter.get('/', getAllCompanies);
companiesRouter.post('/', postCompany);
companiesRouter.get('/:id/score', authenticateToken, authorize('user', 'admin'), getCompanyScore);

module.exports = companiesRouter;
