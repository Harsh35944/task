const { sanitizeUser } = require("../common/utils/sanitizeData");
const ApiError = require("../common/utils/ApiError");
const { User } = require("../repository/index");
const { comparePassword } = require("../common/utils/password.util");
const { generateToken } = require("../common/utils/jwt.util");
const { StatusCodes } = require("http-status-codes");

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return sanitizeUser(user);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not found.");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid email or password");
  }

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return { user, token };
};

module.exports = {
  register,
  login,
};
