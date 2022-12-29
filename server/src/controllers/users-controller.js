const {
  updateUserSettingsById, insertUser, findUserById,
} = require('../collections/users-collection');

const postUser = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await insertUser(user);
    res.json(result);
  } catch (error) {
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
    if (error.message === 'Forbidden') res.status(403).send(error.message);
    else next(error);
  }
};

module.exports = {
  postUser, getUserById, patchUserSettings,
};
