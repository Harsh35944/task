const bookService = require("../services/book.service");
const response = require("../common/utils/response");
const { StatusCodes } = require("http-status-codes");

const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body, req.user.userId);

    response.success(res, "Booking created successfully", StatusCodes.OK, book);
  } catch (err) {
    next(err);
  }
};

module.exports = { createBook };
