const {
  updateUserSettingsById, insertUser, findUserById, authenticateUser,
} = require('../collections/users-collection');

const postUserAuthenticate = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userData = await authenticateUser(user);
    res.json({ user: userData });
  } catch (error) {
    const message = error?.message;
    if (message === 'Unauthorized') res.status(401).json({ message });
    else next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userId = await insertUser(user);
    res.json({ userId });
  } catch (error) {
    const message = error?.message;
    if (message === 'Conflict') res.status(409).json({ message });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const patchUserSettings = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { settings } = req.body;
    const result = await updateUserSettingsById(userId, settings);
    res.json(result);
  } catch (error) {
    const message = error?.message;
    if (message === 'Forbidden') res.status(403).json({ message });
    else next(error);
  }
};

module.exports = {
  postUser, getUserById, patchUserSettings, postUserAuthenticate,
};
