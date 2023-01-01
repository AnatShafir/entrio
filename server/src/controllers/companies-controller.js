const {
  findAllCompanies, calcCompanyScore, insertCompany, findCompanyById,
} = require('../collections/companies-collection');

const getAllCompanies = async (req, res, next) => {
  try {
    const result = await findAllCompanies();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const result = await findCompanyById(companyId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postCompany = async (req, res, next) => {
  try {
    const company = req.body;
    const result = await insertCompany(company);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCompanyScore = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const { userId } = req.body;
    const companyScore = calcCompanyScore(companyId, userId);
    res.json(companyScore);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyById, postCompany, getCompanyScore, getAllCompanies,
};
