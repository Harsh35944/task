const mongoose = require("mongoose");
const {
  ITEM_STATUS,
  ITEM_STATUS_ARRAY,
} = require("../common/constants/itemStatus.constant");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ITEM_STATUS_ARRAY,
      default: ITEM_STATUS.ACTIVE,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
itemSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Item", itemSchema);
