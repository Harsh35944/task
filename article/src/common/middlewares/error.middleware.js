module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    // only show stack in development
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
