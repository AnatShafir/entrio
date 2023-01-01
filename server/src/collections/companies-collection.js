const getDBFunctions = require('../db/db-functions');

const collectionName = 'companies';
const { insert, findById, findAll } = getDBFunctions(collectionName);

const insertCompany = async (company) => await insert(company);

const findCompanyById = async (companyId) => await findById(companyId);

const findAllCompanies = async () => await findAll();

const calcCompanyScore = async (companyId, userId) => {
  const company = await findById(companyId);
  const { settings } = await findById(userId);
  const companyData = { ...company };
  const { userScoring } = companyData;
  companyData.userScoringAvg = userScoring.reduce((a, b) => a + b, 0) / userScoring.length;
  const companyScore = Object.keys(settings)
    .reduce((score, settingKey) => score + companyData[settingKey] * settings[settingKey], 0);
  return companyScore;
};

module.exports = {
  insertCompany, calcCompanyScore, findCompanyById, findAllCompanies,
};
