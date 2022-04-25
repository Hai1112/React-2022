const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    rarity: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    icon: [
      {
        state: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    attack: { type: Number, required: true },
    subStat: { type: String },
    subValue: { type: String },
    passive: {
      name: { type: String },
      value: { type: String },
    },
    lore: { type: String },
    story: { type: String },
    materials: [
      {
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Weapon", WeaponSchema);
