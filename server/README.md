# Entrio Server

Backend service for 'Entrio' companies project

## Getting started

### Install

1. Node version

   Make sure you have node installed on version `>=18.0.0`.

   ```bash
   node -v
   ```

2. Install packages

   ```bash
   npm i
   ```

### Run

1. Generate Token

   To generate [JWT](https://jwt.io/) this service use the env variable
   `TOKEN_SECRET`. So you need to generate it first.

   You can use:

   ```bash
   npm run generate-token
   ```

2. Change config (optional)

   You can change the defaults config in the [config file](./src/config.js)

3. Start server

   Run:

   ```bash
   npm start
   ```

   Or for "watch" mode (like [Nodemon](https://nodemon.io/))

   ```bash
   npm run dev
   ```

### Test

1. Run mongoDB on your local machine

2. Change `db.url` in the [test config file](./test/test-config.js) to your mongoDB url.

3. Run test

   ```bash
   npm test
   ```

4. Run lint

   ```bash
   npm run lint
   ```

## Built With

- Web server: [Express.js](https://expressjs.com)
- Unit testing: [Jest](https://jestjs.io/)
- Database: [MongoDB](https://www.mongodb.com/) -
  [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/).
- Logger: [pino](https://www.npmjs.com/package/pino)
- Schema validator: [Ajv](https://ajv.js.org/)
- Linter: [eslint](https://eslint.org/)
