const {
  findAllCompanies, calcCompanyScore, insertCompany, findCompanyById,
} = require('../collections/companies-collection');

const getAllCompanies = async (_req, res, next) => {
  try {
    const companies = await findAllCompanies();
    res.json({ companies });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const company = await findCompanyById(companyId);
    res.json({ company });
  } catch (error) {
    next(error);
  }
};

const postCompany = async (req, res, next) => {
  try {
    const { company } = req.body;
    const companyId = await insertCompany(company);
    res.json({ companyId });
  } catch (error) {
    next(error);
  }
};

const getCompanyScore = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const { userId } = req.body;
    const companyScore = calcCompanyScore(companyId, userId);
    res.json({ companyScore });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyById, postCompany, getCompanyScore, getAllCompanies,
};
