const router = require("express").Router();
const Character = require("../models/Character");

//CREATE
router.post("/", async (req, res) => {
  const newCharacter = new Character(req.body);
  try {
    const savedCharacter = await newCharacter.save();
    res.status(200).json(savedCharacter);
  } catch (err) {
    console.log(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCharacter);
  } catch (err) {
    console.log(err);
  }
});

//GET WEAPON
router.get("/find/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.status(200).json(character);
  } catch (err) {
    console.log(err);
  }
});

//GET ALL WEAPONS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  try {
    let characters;
    if (qNew) {
      characters = await Character.find().sort({ createdAt: -1 }).limit(5);
    } else {
      characters = await Character.find();
    }
    res.status(200).json(characters);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
