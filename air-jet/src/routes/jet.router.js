const express = require("express");
const { createJet } = require("../controllers/jet.controller");
const validate = require("../common/middlewares/joi.middleware");
const { createJetSchema } = require("../middlewares/jet.middleware");
const authProtect = require("../middlewares/auth.protect.middleware");
const roleGuard = require("../common/middlewares/role.guard");
const { USER_ROLES } = require("../common/constants/roles.constant");

const router = express.Router();

// router.post("/login", validate(loginSchema), login);
router.post(
  "/createJet",
  authProtect,
  roleGuard(USER_ROLES.PILOT),
  validate(createJetSchema),
  createJet
);

module.exports = router;
