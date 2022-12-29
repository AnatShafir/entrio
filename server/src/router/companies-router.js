const express = require('express');

const { getCompanyById, postCompany } = require('../controllers/companies-controller');

const companiesRouter = express.Router();
companiesRouter.get('/:id', getCompanyById);
companiesRouter.post('/', postCompany);

module.exports = companiesRouter;
