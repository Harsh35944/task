const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: { type: "String" },
    userId: { type: mongoose.Schema.Types.ObjectId,ref:"User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);
