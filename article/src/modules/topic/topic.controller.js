const topicService = require("./topic.service");

const createTopic = async (req, res, next) => {
  try {
    const topic = await topicService.createTopic(req);

    res.status(201).json({
      success: true,
      message: "Create topic successfully",
      data: topic,
    });
  } catch (err) {
    next(err);
  }
};

const getTopic = async (req, res, next) => {
  try {
    const topic = await topicService.getTopic(req);

    res.status(201).json({
      success: true,
      message: "Get topic successfully",
      data: topic,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTopic, getTopic };
