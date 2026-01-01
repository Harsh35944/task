const express = require("express");
const { createBook } = require("../controllers/book.controller");
const validate = require("../common/middlewares/joi.middleware");
const { createBookSchema } = require("../middlewares/book.middleware");
const authProtect = require("../middlewares/auth.protect.middleware");
const roleGuard = require("../common/middlewares/role.guard");
const { USER_ROLES } = require("../common/constants/roles.constant");

const router = express.Router();

// router.post("/login", validate(loginSchema), login);
router.post(
  "/createBook",
  authProtect,
  roleGuard(USER_ROLES.USER),
  validate(createBookSchema),
  createBook
);

module.exports = router;
