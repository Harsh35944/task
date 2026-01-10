const { hashPassword } = require("../common/utils/password.util");
const mongoose = require("mongoose");
const { USER_ROLES } = require("../common/constants/roles.constant");

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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hashPassword(this.password);
});

module.exports = mongoose.model("User", userSchema);
