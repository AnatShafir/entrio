const logger = require('../utils/logger');
const { updateUserSettingsById, insertUser, validateLogin } = require('../collections/users.collection');
const { generateToken } = require('../utils/jwt');

const { authCookieName } = require('../config');

const generateUserToken = ({ _id, role }) => generateToken({ _id, role });

const postUserLogin = async (req, res, next) => {
  try {
    const { reqId } = req;
    const { user } = req.body;
    logger.info('Validating user login...', { reqId, user });
    const userData = await validateLogin(user);
    logger.info('User login validated successfully', { reqId, user: userData });

    const token = generateUserToken(userData);
    res
      .status(200)
      .cookie(authCookieName, token, { httpOnly: true, secure: true })
      .json({ user: userData });
  } catch (error) {
    const message = error?.message;
    if (message === 'Unauthorized') return res.status(401).json({ message });
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { reqId } = req;
    const { user } = req.body;
    logger.info('Inserting user...', { reqId, user });
    const newUser = await insertUser(user);
    logger.info('User inserted successfully', { reqId, newUser });
    const token = generateUserToken(newUser);
    res
      .status(200)
      .cookie(authCookieName, token, { httpOnly: true, secure: true })
      .json({ user: newUser });
  } catch (error) {
    const message = error?.message;
    if (message === 'Conflict') return res.status(409).json({ message });
    next(error);
  }
};

const patchUserSettings = async (req, res, next) => {
  try {
    const { reqId } = req;
    const { _id: userId } = req.user;
    const { settings } = req.body;
    logger.info('Updating user...', { reqId, userId, settings });
    await updateUserSettingsById(userId, settings);
    logger.info('User update successfully', { reqId, userId, settings });

    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    const message = error?.message;
    if (message === 'Forbidden') res.status(403).json({ message });
    else next(error);
  }
};

module.exports = {
  postUser, patchUserSettings, postUserLogin,
};
