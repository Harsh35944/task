const jetService = require("../services/jet.service");
const response = require("../common/utils/response");
const { StatusCodes } = require("http-status-codes");

const createJet = async (req, res, next) => {
  try {
    const jet = await jetService.createJet(req.body, req.user.userId);

    response.success(res, "Jet created successfully", StatusCodes.OK, jet);
  } catch (err) {
    next(err);
  }
};

module.exports = { createJet };
