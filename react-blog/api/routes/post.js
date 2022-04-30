const router = require("express").Router();
const Post = require("../models/Post");
const verifyToken = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const category = req.query.category;
  try {
    let posts;
    if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

//GET ONE
router.get("/find/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
