const {
  findAllCompanies, calcCompanyScore, insertCompany,
} = require('../collections/companies-collection');

const getAllCompanies = async (_req, res, next) => {
  try {
    const companies = await findAllCompanies();
    res.status(200).json({ companies });
  } catch (error) {
    next(error);
  }
};

const postCompany = async (req, res, next) => {
  try {
    const { company } = req.body;
    const newCompany = await insertCompany(company);
    res.status(200).json({ company: newCompany });
  } catch (error) {
    next(error);
  }
};

const getCompanyScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const companyScore = await calcCompanyScore(id, userId);
    res.status(200).json({ companyScore });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCompany, getCompanyScore, getAllCompanies,
};
