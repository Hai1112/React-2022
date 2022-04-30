const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUSer = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUSer.save();
    res.status(200).json(savedUser);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong username");

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET
    ).toString(CryptoJS.enc.Utf8);
    decryptedPassword !== req.body.password &&
      res.status(401).json("Wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
