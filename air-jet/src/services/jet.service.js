const { Jet } = require("../repository/index");
const ApiError = require("../common/utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const createJet = async ({ name, seat, date, tripAmount }, userId) => {
  console.log({ name, seat, date, tripAmount, userId });

  const existingJet = await Jet.findOne({ name });
  if (existingJet) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Jet already created.");
  }

  const jet = await Jet.create({ name, userId, seat, date, tripAmount });

  return jet;
};

module.exports = { createJet };
