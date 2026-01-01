const { Book, Jet } = require("../repository/index");
const ApiError = require("../common/utils/ApiError");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const createBook = async ({ jetId, pilotId, bookAmount }, userId) => {
  console.log({ jetId, pilotId, bookAmount, userId });

  const existingBook = await Book.findOne({ jetId, userId });
  if (existingBook) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Booking already done.");
  }

  const [findJet] = await Jet.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(jetId),
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "jetId",
        as: "books",
      },
    },
    {
      $addFields: {
        bookedCount: { $size: "$books" },
      },
    },
    {
      $project: {
        books: 0,
      },
    },
  ]);

  if (findJet && findJet.seat <= findJet.bookedCount + 1) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Jet is full.");
  }

  const calculateBookAmount = findJet.tripAmount / (findJet.bookedCount + 2);
  console.log("calculateBookAmount", calculateBookAmount);

  const book = await Book.create({
    jetId,
    pilotId,
    bookAmount: Number(calculateBookAmount.toFixed(2)),
    userId,
  });

  return book;
};

module.exports = { createBook };
