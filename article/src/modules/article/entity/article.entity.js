const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    article: { type: "String" },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
