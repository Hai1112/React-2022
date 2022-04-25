const mongoose = require("mongoose");

const ArtifactSchema = new mongoose.Schema(
  {
    set: { type: String, required: true, unique: true },
    rarity: { type: Number, required: true },
    set2: { type: String, default: null },
    set4: { type: String, default: null },
    description: { type: String, required: true },
    pieces: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true, unique: true },
        piece: { type: String, required: true },
        image: { type: String, required: true },
        lore: { type: String, required: true },
        story: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artifact", ArtifactSchema);
