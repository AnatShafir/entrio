const getDBFunctions = require('../db/db-functions');
const { findUserById } = require('./users-collection');

const collectionName = 'companies';
const { insert, findById, findAll } = getDBFunctions(collectionName);

const insertCompany = async (company) => await insert({ ...company, userScoring: [] });

const findAllCompanies = async () => await findAll();

const getSizeScore = (size) => {
  if (size < 10) return 1;
  if (size < 100) return 2;
  if (size < 1000) return 3;
  return 4;
};

const getFundingScore = (funding) => {
  if (funding < 1_000_000) return 1;
  if (funding < 10_000_000) return 2;
  if (funding < 100_000_000) return 3;
  return 4;
};

const getAgeScore = (age) => {
  if (age < 1) return 1;
  if (age < 5) return 2;
  if (age < 12) return 3;
  return 4;
};

const getUserScoringScore = (userScoring) => {
  const sumUserScoring = userScoring.reduce((a, b) => a + b, 0);
  return sumUserScoring / userScoring.length;
};

const getScore = {
  size: getSizeScore,
  funding: getFundingScore,
  age: getAgeScore,
  userScoring: getUserScoringScore,
};

const calcCompanyScore = async (companyId, userId) => {
  const company = await findById(companyId);
  const { settings } = await findUserById(userId);
  const companyScore = Object.keys(settings).reduce((score, key) => {
    const companyValueScore = getScore[key](company[key]);
    const weight = settings[key];
    return score + companyValueScore * weight;
  }, 0);
  return Number(companyScore.toFixed(2));
};

module.exports = {
  insertCompany, calcCompanyScore, findAllCompanies,
};
