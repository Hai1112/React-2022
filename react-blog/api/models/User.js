const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
