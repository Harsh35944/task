const { Item } = require("../repository/index");
const ApiError = require("../common/utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const createItem = async (data, userId) => {
  const item = await Item.create({
    ...data,
    userId,
  });

  return item;
};

const getItems = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category = "",
    status = "",
    minPrice = "",
    maxPrice = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = queryParams;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [items, totalCount] = await Promise.all([
    Item.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .populate("userId", "name email")
      .lean(),
    Item.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalCount / limitNumber);
  const hasNextPage = pageNumber < totalPages;
  const hasPrevPage = pageNumber > 1;

  return {
    items,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalItems: totalCount,
      itemsPerPage: limitNumber,
      hasNextPage,
      hasPrevPage,
    },
  };
};

module.exports = {
  createItem,
  getItems,
};
