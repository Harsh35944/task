const express = require("express");
const { test, fileUpload } = require("../controllers/test.controller");
const upload = require("../common/utils/multer");

const router = express.Router();

router.get("/", test);
console.log("call rout");

router.post("/fileUpload", upload.single("profile"), fileUpload);

module.exports = router;
