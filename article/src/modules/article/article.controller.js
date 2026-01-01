const articleService = require("./article.service");

const createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req);

    res.status(201).json({
      success: true,
      message: "Create article successfully",
      data: article,
    });
  } catch (err) {
    next(err);
  }
};

const myArticle = async (req, res, next) => {
  try {
    const article = await articleService.myArticle(req);

    res.status(201).json({
      success: true,
      message: "Get my article successfully",
      data: article,
    });
  } catch (err) {
    next(err);
  }
};

const getArticle = async (req, res, next) => {
  try {
    const article = await articleService.getArticle(req);

    res.status(201).json({
      success: true,
      message: "Get article successfully",
      data: article,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createArticle, myArticle, getArticle };
