const mongoose = require("mongoose");
const { USER_ROLES } = require("../../../common/constants/roles.constant");

const userSchema = new mongoose.Schema(
  {
    name: { type: "String", require: true },
    email: { type: "String", unique: true, require: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: USER_ROLES,
      default: USER_ROLES.USER,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
