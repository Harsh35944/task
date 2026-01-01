const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/user/user.routes");
const topicRoutes = require("../modules/topic/topic.routes");
const articleRoutes = require("../modules/article/article.routes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/topic", topicRoutes);

router.use("/article", articleRoutes);

module.exports = router;
