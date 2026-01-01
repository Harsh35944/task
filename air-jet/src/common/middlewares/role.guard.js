const ApiError = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated")
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          StatusCodes.FORBIDDEN,
          "You do not have permission to perform this action"
        )
      );
    }

    next();
  };
};

module.exports = roleGuard;
