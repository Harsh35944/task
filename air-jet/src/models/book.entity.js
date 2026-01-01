const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    jetId: { type: mongoose.Schema.Types.ObjectId, ref: "Jet" },
    pilotId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookAmount: { type: Number, min: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
