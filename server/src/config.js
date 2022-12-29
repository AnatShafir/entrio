module.exports = {
  port: 3000,
  db: {
    url: 'mongodb://127.0.0.1:27017',
    dbName: 'entrio',
  },
  defaultSettings: {
    companySizeWeight: 0.3,
    companyFundingWeight: 0.4,
    companyAgeWeight: 0.2,
    userScoringWeight: 0.1,
  },
};
