const { updateUserSettingsById, insertUser, validateLogin } = require('../collections/users-collection');
const { generateToken } = require('../utils/jwt');
const { validator } = require('../utils/validation');
const { authCookieName } = require('../config');

const generateUserToken = ({ _id, role }) => generateToken({ _id, role });

const postUserLogin = async (req, res, next) => {
  try {
    const validate = validator.getSchema('postUserBody');
    if (!validate(req.body)) return res.status(400).json({ errors: validate.errors });
    const { user } = req.body;
    const userData = await validateLogin(user);
    const token = generateUserToken(userData);
    res
      .status(200)
      .cookie(authCookieName, token, { httpOnly: true, secure: true })
      .json({ user: userData });
  } catch (error) {
    const message = error?.message;
    if (message === 'Unauthorized') res.status(401).json({ message });
    else next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const newUser = await insertUser(user);
    const token = generateUserToken(newUser);
    res
      .status(200)
      .cookie(authCookieName, token, { httpOnly: true, secure: true })
      .json({ user: newUser, token });
  } catch (error) {
    const message = error?.message;
    if (message === 'Conflict') res.status(409).json({ message });
    else next(error);
  }
};

const patchUserSettings = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { settings } = req.body;
    await updateUserSettingsById(userId, settings);
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
