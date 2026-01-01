const mongoose = require("mongoose");

const jetSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seat: { type: Number },
    date: { type: Date },
    tripAmount: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jet", jetSchema);
