const { getDB } = require('../../src/db/db-client');

describe('db client', () => {
  it('Should access db', async () => {
    const db = getDB();
    await db.command({ ping: 1 });
  });
});
