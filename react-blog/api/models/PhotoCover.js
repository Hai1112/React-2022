const mongoose = require("mongoose");

const PhotoCoverSchema = mongoose.Schema(
  {
    image: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PhotoCover", PhotoCoverSchema);
