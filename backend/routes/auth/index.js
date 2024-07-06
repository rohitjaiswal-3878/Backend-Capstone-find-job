const express = require("express");
const router = express.Router();
const User = require("../../schemas/user.model");

router.post("/register", async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists." });
  }
  const newUser = new User({
    name,
    email,
    password,
    mobile,
  });
  await newUser.save();
  res.send(newUser);
});

module.exports = router;
