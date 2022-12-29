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

const getCompanyScore = async (req, res) => {
  const companyId = req.params.id;
  const { userId } = req.body;
  const company = await findById(collectionName, companyId);
  const { settings } = await findById(collectionName, userId);
  const { userScoring } = company;
  company.userScoringAvg = userScoring.reduce((a, b) => a + b, 0) / userScoring.length;
  const companyScore = Object.keys(settings)
    .reduce((score, settingKey) => score + company[settingKey] * settings[settingKey], 0);
  res(companyScore);
};

module.exports = { getCompanyById, postCompany, getCompanyScore };
