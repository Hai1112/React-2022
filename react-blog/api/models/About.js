const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema(
  {
    desc: { type: String, required: true },
    quote: { type: String, required: false },
    image: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
