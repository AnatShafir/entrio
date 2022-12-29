const { insert, findById } = require('../collections/companies-collection');

const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  const result = await findById(companyId);
  res(result);
};

const postCompany = async (req, res) => {
  const company = req.body;
  const result = await insert(company);
  res(result);
};

module.exports = { getCompanyById, postCompany };
