module.exports = (...permittedRoles) => (req, res, next) => {
  const { user } = req.body;

  if (user && permittedRoles.includes(user.role)) next();
  else res.status(403).json({ message: 'Forbidden' });
};
