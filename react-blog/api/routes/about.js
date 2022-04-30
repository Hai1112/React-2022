const router = require("express").Router();
const About = require("../models/About");
const verifyToken = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newAbout = new About(req.body);
  try {
    const savedAbout = await newAbout.save();
    res.status(200).json(savedAbout);
  } catch (err) {
    console.log(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAbout);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
