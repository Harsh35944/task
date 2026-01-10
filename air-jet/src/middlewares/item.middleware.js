const Joi = require("joi");
const {
  ITEM_STATUS_ARRAY,
} = require("../common/constants/itemStatus.constant");

const createItemSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(100),
  description: Joi.string().optional().trim().max(500),
  category: Joi.string().optional().trim().max(50),
  price: Joi.number().min(0).optional(),
  status: Joi.string()
    .valid(...ITEM_STATUS_ARRAY)
    .optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
});

const getItemsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().optional().trim(),
  category: Joi.string().optional().trim(),
  status: Joi.string()
    .valid(...ITEM_STATUS_ARRAY)
    .optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  sortBy: Joi.string()
    .valid("name", "price", "createdAt", "updatedAt", "category", "status")
    .optional(),
  sortOrder: Joi.string().valid("asc", "desc").optional(),
});

module.exports = { createItemSchema, getItemsSchema };
