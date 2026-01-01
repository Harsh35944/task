const Joi = require("joi");

const createJetSchema = Joi.object({
  name: Joi.string().required(),
  seat: Joi.number().integer().min(1).required(),
  date: Joi.date().required(),
  tripAmount: Joi.number().positive().required(),
});

module.exports = { createJetSchema };
