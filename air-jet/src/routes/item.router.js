const express = require("express");
const { createItem, getItems } = require("../controllers/item.controller");
const validate = require("../common/middlewares/joi.middleware");
const {
  createItemSchema,
  getItemsSchema,
} = require("../middlewares/item.middleware");
const authProtect = require("../middlewares/auth.protect.middleware");
const {
  VALIDATION_SOURCE,
} = require("../common/constants/validation.constant");

const router = express.Router();

router.post("/create", authProtect, validate(createItemSchema), createItem);

router.get("/", validate(getItemsSchema, VALIDATION_SOURCE.QUERY), getItems);

module.exports = router;
