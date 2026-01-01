const sanitizeUser = (user) => {
  const { password, ...sanitize } = user.toObject();
  return sanitize;
};

module.exports = {
  sanitizeUser,
};
