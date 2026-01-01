const express = require("express");
const validate = require("../../common/middlewares/joi.middleware");
const { createTopicSchema } = require("./topic.validation");
const { createTopic, getTopic } = require("./topic.controller");
const authProtect = require("../../common/middlewares/auth.protect.middleware");

const router = express.Router();

router.get("/getTopic", authProtect, getTopic);
router.post(
  "/createTopic",
  authProtect,
  validate(createTopicSchema),
  createTopic
);

module.exports = router;
