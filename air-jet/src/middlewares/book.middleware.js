const Joi = require("joi");

const createBookSchema = Joi.object({
  jetId: Joi.string().required(),
  pilotId: Joi.string().required(),
  bookAmount: Joi.number().positive().required(),
});

module.exports = { createBookSchema };
