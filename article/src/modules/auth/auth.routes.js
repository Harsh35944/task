const express = require("express");
const validate = require("../../common/middlewares/joi.middleware");
const {registerSchema, loginSchema } = require("./auth.validation");
const controller = require("./auth.controller");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;
