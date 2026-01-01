const {
  hashPassword,
  comparePassword,
} = require("../../common/utils/password.util");
const { generateToken } = require("../../common/utils/jwt.util");
const User = require("../user/entity/user.entity");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: "Email already registered" };
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 400, message: "Invalid email or password" };
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw { status: 400, message: "Invalid email or password" };
  }

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return { user, token };
};

module.exports = { register, login };
