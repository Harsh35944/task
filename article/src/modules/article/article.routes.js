const express = require("express");
const validate = require("../../common/middlewares/joi.middleware");
const { createArticleSchema } = require("./article.validation");
const { createArticle, myArticle,getArticle } = require("./article.controller");
const authProtect = require("../../common/middlewares/auth.protect.middleware");

const router = express.Router();

router.get("/myArticle", authProtect, myArticle);
router.get("/getArticle", authProtect, getArticle);
router.post(
  "/createArticle",
  authProtect,
  validate(createArticleSchema),
  createArticle
);

module.exports = router;
