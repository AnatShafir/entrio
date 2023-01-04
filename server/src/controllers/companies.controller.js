const logger = require('../utils/logger');
const {
  findAllCompanies, calcCompanyScore, insertCompany,
} = require('../collections/companies.collection');

const getAllCompanies = async (req, res, next) => {
  try {
    const { reqId } = req;
    logger.info('Finding all companies...', { reqId });
    const companies = await findAllCompanies();
    logger.info('Companies found successfully', { reqId, companiesNumber: companies.length });
    res.status(200).json({ companies });
  } catch (error) {
    next(error);
  }
};

const postCompany = async (req, res, next) => {
  try {
    const { reqId } = req;
    const { company } = req.body;
    logger.info('Inserting company...', { reqId, company });
    const newCompany = await insertCompany(company);
    logger.info('Company inserted successfully', { reqId, newCompany });
    res.status(200).json({ company: newCompany });
  } catch (error) {
    next(error);
  }
};

const getCompanyScore = async (req, res, next) => {
  try {
    const { reqId } = req;
    const { id: companyId } = req.params;
    const { _id: userId } = req.user;
    logger.info('Calculating company score...', { reqId, companyId, userId });
    const companyScore = await calcCompanyScore(companyId, userId);
    logger.info('Company score calculated successfully', {
      reqId, companyId, userId, companyScore,
    });

    res.status(200).json({ companyScore });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCompany, getCompanyScore, getAllCompanies,
};
