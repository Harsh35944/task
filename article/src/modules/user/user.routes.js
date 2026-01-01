const express = require("express");
const { userProfile, userFollowAndUnFollow } = require("./user.controller");
const authProtect = require("../../common/middlewares/auth.protect.middleware");

const router = express.Router();

router.get("/getProfile", authProtect, userProfile);
router.post("/userFollowAndUnFollow", authProtect, userFollowAndUnFollow);

module.exports = router;
