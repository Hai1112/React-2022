const router = require("express").Router();
const Weapon = require("../models/Weapon");

//CREATE
router.post("/", async (req, res) => {
  const newWeapon = new Weapon(req.body);
  try {
    const savedWeapon = await newWeapon.save();
    res.status(200).json(savedWeapon);
  } catch (err) {
    console.log(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedWeapon = await Weapon.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWeapon);
  } catch (err) {
    console.log(err);
  }
});

//GET WEAPON
router.get("/find/:id", async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);
    res.status(200).json(weapon);
  } catch (err) {
    console.log(err);
  }
});

//GET ALL WEAPONS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  try {
    let weapons;
    if (qNew) {
      weapons = await Weapon.find().sort({ createdAt: -1 }).limit(5);
    } else {
      weapons = await Weapon.find();
    }
    res.status(200).json(weapons);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
