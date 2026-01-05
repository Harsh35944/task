const testService = require("../services/test.service");
const { StatusCodes } = require("http-status-codes");
const response = require("../common/utils/response");
const { upload } = require("../common/utils/multer");

const test = async (req, res, next) => {
  try {
    const test = await testService.test();

    response.success(res, test, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const fileUpload = async (req, res, next) => {
  try {
    let profileImage = null;

    if (req.file) {
      console.log("req.file = ", req.file);

      profileImage = `${req.protocol}://${req.get("host")}/uploads/profile/${
        req.file.filename
      }`;
    }

    console.log("file upload == ", profileImage,"\n ==",req.body);

    response.success(
      res,
      "File uploaded successfully",
      StatusCodes.OK,
      req.file
    );
  } catch (err) {
    console.log("error = ", err);

    next(err);
  }
};

module.exports = { test, fileUpload };
