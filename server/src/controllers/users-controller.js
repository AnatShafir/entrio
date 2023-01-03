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
    const { insertedId } = await insertUser(user);
    const newUser = await findUserById(insertedId);
    res.json({ user: newUser });
  } catch (error) {
    const message = error?.message;
    if (message === 'Conflict') res.status(409).json({ message });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const patchUserSettings = async (req, res, next) => {
  try {
    const userId = req.params.id;
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
  postUser, getUserById, patchUserSettings, postUserAuthenticate,
};
