const Article = require("./entity/article.entity");
const UserFollow = require("../user/entity/user-follows.entity");
const mongoose = require("mongoose");
const createArticle = async (req) => {
  const userId = req.user.userId;

  const { article, topicId } = req.body;

  const createArticle = await Article.create({ article, userId, topicId });

  return createArticle;
};

const myArticle = async (req) => {
  const userId = req.user.userId;

  const findArticle = await Article.find({ userId });

  if (!findArticle) {
    throw { status: 400, message: "Article not found." };
  }

  return findArticle;
};

const getArticle = async (req) => {
  const userId = req.user.userId;
  console.log(userId);

  console.log(new mongoose.Types.ObjectId(userId));

  //   const findArticle = await Article.find().populate()

  const articles = await UserFollow.aggregate([
    {
      $match: { fromUser: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "articles",
        localField: "toUser",
        foreignField: "userId",
        as: "articles",
      },
    },
    {
      $unwind: "$articles",
    },
    {
      $replaceRoot: {
        newRoot: "$articles",
      },
    },
  ]);

  if (!articles) {
    throw { status: 400, message: "Article not found." };
  }

  return articles;
};

module.exports = { createArticle, myArticle, getArticle };
