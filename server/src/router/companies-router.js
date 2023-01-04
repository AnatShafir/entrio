const express = require('express');

const authorize = require('../middleware/authorization');
const authenticateToken = require('../middleware/authentication');
const validate = require('../middleware/validation');

const { getAllCompanies, postCompany, getCompanyScore } = require('../controllers/companies-controller');

const companiesRouter = express.Router();

companiesRouter.get('/', getAllCompanies);
companiesRouter.post('/', validate('companyBody'), postCompany);
companiesRouter.get('/:id/score', authenticateToken, authorize('user', 'admin'), getCompanyScore);

module.exports = companiesRouter;
