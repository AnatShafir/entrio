const {
  updateUserSettingsById, insertUser, findUserById, authenticateUser,
} = require('../collections/users-collection');

const postUserAuthenticate = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const user = await authenticateUser(userInfo);
    res.json(user);
  } catch (error) {
    const message = error?.message;
    if (message === 'Unauthorized') res.status(401).json({ message });
    else next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await insertUser(user);
    res.json(result);
  } catch (error) {
    const message = error?.message;
    if (message === 'Conflict') res.status(409).json({ message });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await findUserById(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const patchUserSettings = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateSettings = req.body;
    const result = await updateUserSettingsById(userId, { settings: updateSettings });
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
