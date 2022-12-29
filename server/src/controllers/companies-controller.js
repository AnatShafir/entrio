const { findById } = require('../collections/companies-collection');

const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  const result = await findById(companyId);
  res(result);
};

module.exports = { getCompanyById };
