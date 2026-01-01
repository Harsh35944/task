const authService = require("../services/auth.service");
const response = require("../common/utils/response");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    response.success(res, "User registered successfully", StatusCodes.OK, user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    response.success(res, "Login successful", StatusCodes.OK, result);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
