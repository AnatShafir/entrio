module.exports = (...permittedRoles) => (req, res, next) => {
  const { user } = req.body;
  const { id } = req.params;
  if (user && permittedRoles.includes(user.role) && user.id === id) return next();
  res.status(403).json({ message: 'Forbidden' });
};
