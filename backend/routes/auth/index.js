const express = require("express");
const router = express.Router();
const User = require("../../schemas/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Wrong email or password." }); // user does not exist.
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Wromg email or password." });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res
        .header("auth-token", token)
        .json({ message: "Logged in successfully!" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists." });
  }
  const salt = await bcrypt.genSalt(11); // genSalt adds the level of difficulty of the algorithm
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    mobile,
  });
  await newUser.save();
  res.send(newUser);
});

module.exports = router;
