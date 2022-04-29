const router = require("express").Router();
const PhotoCover = require("../models/PhotoCover");
const verifyToken = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newPhotoCover = new PhotoCover(req.body);
  try {
    const savedPhotoCover = await newPhotoCover.save();
    res.status(200).json(savedPhotoCover);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const photoCover = await PhotoCover.find();
    res.status(200).json(photoCover);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCover = await PhotoCover.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCover);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
