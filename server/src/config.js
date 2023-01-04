module.exports = {
  port: 3000,
  logLevel: 'info',
  db: {
    url: 'mongodb://127.0.0.1:27017',
    dbName: 'entrio',
  },
  defaultSettings: {
    size: 0.3,
    funding: 0.4,
    age: 0.2,
    userScoring: 0.1,
  },
  adminUser: {
    username: 'Admin',
    password: 'admin',
    role: 'admin',
  },
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  tokenExpiresIn: '3d',
  authCookieName: 'SESSIOID',
  corsOptions: {
    credentials: true,
    origin: ['http://localhost:4200'],
  },
};
