const { StatusCodes } = require("http-status-codes");

exports.success = (res, message, status = StatusCodes.OK, data = null) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

exports.error = (res, message, status = StatusCodes.INTERNAL_SERVER_ERROR) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
