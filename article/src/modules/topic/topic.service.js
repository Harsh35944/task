const Topic = require("./entity/topic.entity");

const createTopic = async (req) => {
  const userId = req.user.userId;

  const { name } = req.body;

  const findTopic = await Topic.findOne({ name, userId });

  if (findTopic) {
    throw { status: 400, message: "Topic already create." };
  }

  const topic = await Topic.create({ name, userId });

  return topic;
};

const getTopic = async (req) => {
  const userId = req.user.userId;

  console.log("user id", userId);

  const findTopic = await Topic.find({ userId: userId });
  console.log("topic", findTopic);

  if (!findTopic) {
    throw { status: 400, message: "Topic not found." };
  }

  return findTopic;
};

module.exports = {
  createTopic,
  getTopic,
};
