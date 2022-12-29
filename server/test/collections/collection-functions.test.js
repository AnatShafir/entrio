const { insert, findById } = require('../../src/db/db-functions');
const { testCompany } = require('../test-data');
const { getDB } = require('../../src/db/db-client');

const collectionName = 'companies';
let collection;

describe('Company collection', () => {
  beforeAll(() => {
    const db = getDB();
    collection = db.collection(collectionName);
  });

  afterEach(async () => await collection.drop());

  test('should insert a company into the collection', async () => {
    const { insertedIds } = await insert(collectionName, testCompany);
    const companyId = insertedIds[0];
    const expectedCompany = { ...testCompany, _id: companyId };
    const company = await collection.findOne({ _id: companyId });
    expect(company).toEqual(expectedCompany);
  });

  test('should find a company by id', async () => {
    const { insertedIds } = await collection.insert(testCompany);
    const companyId = insertedIds[0];
    const expectedCompany = { ...testCompany, _id: companyId };
    const company = await findById(collectionName, companyId);
    expect(company).toEqual(expectedCompany);
  });
});
