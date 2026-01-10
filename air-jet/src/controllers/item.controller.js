const itemService = require("../services/item.service");
const response = require("../common/utils/response");
const { StatusCodes } = require("http-status-codes");

const createItem = async (req, res, next) => {
  try {
    const item = await itemService.createItem(req.body, req.user?.userId);

    response.success(
      res,
      "Item created successfully",
      StatusCodes.CREATED,
      item
    );
  } catch (err) {
    next(err);
  }
};

const getItems = async (req, res, next) => {
  try {
    const result = await itemService.getItems(req.query);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Items fetched successfully",
      data: result.items,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createItem, getItems };
