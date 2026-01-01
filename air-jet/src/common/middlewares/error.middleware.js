const { StatusCodes } = require("http-status-codes");

module.exports = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    errors: err.errors || null,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
