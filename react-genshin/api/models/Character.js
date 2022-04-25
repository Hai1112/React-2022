const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    rarity: { type: Number, required: true },
    vision: { type: String, required: true },
    weapon: { type: String, required: true },
    description: { type: String },
    image: {
      thumbnail: { type: String, required: true },
      wish: { type: String, required: true },
    },
    profile: [
      {
        label: { type: String, required: true },
        desc: { type: String },
      },
    ],
    stats: [
      {
        stat: { type: String, required: true },
        value: { type: String },
      },
    ],
    ascensionMaterials: [
      {
        type: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    talentMaterials: [
      {
        type: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    constellations: [
      {
        id: { type: Number, required: true },
        icon: { type: String, required: true },
        name: { type: String, required: true },
        effect: { type: String, required: true },
      },
    ],
    passiveTalents: [
      {
        id: { type: Number, required: true },
        icon: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        effect: { type: String, required: true },
      },
    ],
    combatTalents: [
      {
        id: { type: Number, required: true },
        icon: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        detail: { type: String },
        description: { type: String },
        effects: [
          {
            effect: { type: String },
            desc: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", CharacterSchema);
