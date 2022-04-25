const router = require("express").Router();
const Artifact = require("../models/Artifact");

//CREATE
router.post("/", async (req, res) => {
  const newArtifact = new Artifact(req.body);
  try {
    const savedArtifact = await newArtifact.save();
    res.status(200).json(savedArtifact);
  } catch (err) {
    console.log(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedArtifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedArtifact);
  } catch (err) {
    console.log(err);
  }
});

//GET ARTIFACT
router.get("/find/:id", async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    res.status(200).json(artifact);
  } catch (err) {
    console.log(err);
  }
});

//GET ALL ARTIFACTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  try {
    let artifacts;
    if (qNew) {
      artifacts = await Artifact.find().sort({ createdAt: -1 }).limit(5);
    } else {
      artifacts = await Artifact.find();
    }
    res.status(200).json(artifacts);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
