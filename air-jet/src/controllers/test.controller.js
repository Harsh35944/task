const testService = require("../services/test.service");
const { StatusCodes } = require("http-status-codes");
const response = require("../common/utils/response");

const test = async (req, res, next) => {
  try {
    const test = await testService.test();

    response.success(res, test, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

module.exports = { test };
