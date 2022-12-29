const express = require('express');

const { getCompanyById, postCompany, getCompanyScore } = require('../controllers/companies-controller');

const companiesRouter = express.Router();
companiesRouter.get('/:id', getCompanyById);
companiesRouter.get('/:id/score', getCompanyScore);
companiesRouter.post('/', postCompany);

module.exports = companiesRouter;
