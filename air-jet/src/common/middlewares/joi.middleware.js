const { VALIDATION_SOURCE } = require("../constants/validation.constant");

module.exports = (schema, source = VALIDATION_SOURCE.BODY) => {
  return (req, res, next) => {
    const data = source === VALIDATION_SOURCE.QUERY ? req.query : req.body;
    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    next();
  };
};
