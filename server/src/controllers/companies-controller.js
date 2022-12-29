const { insert, findById } = require('../db/db-functions');

const collectionName = 'companies';

const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  const result = await findById(collectionName, companyId);
  res(result);
};

const postCompany = async (req, res) => {
  const company = req.body;
  const result = await insert(collectionName, company);
  res(result);
};

module.exports = { getCompanyById, postCompany };
