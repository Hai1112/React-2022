const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    categories: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
