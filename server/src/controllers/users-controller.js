const {
  updateUserSettingsById, insertUser, findUserById, authenticateUser,
} = require('../collections/users-collection');

const { generateAccessToken } = require('../utils/jwt');

const generateUserToken = ({ _id, role }) => generateAccessToken({ _id, role });

const postUserAuthenticate = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userData = await authenticateUser(user);
    const token = generateUserToken(userData);
    res.status(200).json({ user: userData, token });
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
    const token = generateUserToken(newUser);
    res.status(200).json({ user: newUser, token });
  } catch (error) {
    const message = error?.message;
    if (message === 'Conflict') res.status(409).json({ message });
    else next(error);
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
  postUser, patchUserSettings, postUserAuthenticate,
};
