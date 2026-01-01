const Joi = require("joi");

const createArticleSchema = Joi.object({
  article: Joi.string().required(),
  topicId: Joi.string().required(),
});

module.exports = { createArticleSchema };
