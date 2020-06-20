const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const User = require("../models/user");
const { validateRegister, validateLogin } = require("./validation/validate");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (error) {
    res.send({
      error_msg: "Something went wrong on server. Please try again later."
    });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find()
      .sort("name")
      .select("-password");
    res.send(users);
  } catch (error) {
    res.send({
      error_msg: "Something went wrong on server. Please try again later."
    });
  }
});

router.post("/register", auth, async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error)
    return res.status(400).json({ error_msg: error.details[0].message });

  const { name, email, password, isAdmin } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists." });
    const user = new User({
      name,
      email,
      password,
      isAdmin
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({
      success_msg: "User registered successfully.",
      newUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.send({
      error_msg: "Something went wrong on server. Please try again later."
    });
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(400).json({ error_msg: error.details[0].message });
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error_msg: "Invalid email or password." });

    const validPasword = await bcrypt.compare(password, user.password);
    if (!validPasword)
      return res.status(400).json({ error_msg: "Invalid email or password." });

    const token = user.generateAuthToken();
    res.send(token);
  } catch (error) {
    res.send({
      error_msg: "Something went wrong on server. Please try again later."
    });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ error_msg: "The User with the given ID was not found." });
    res.send({ success_msg: "The User was deleted successfully." });
  } catch (error) {
    res.send({
      error_msg: "Something went wrong on server. Please try again later."
    });
  }
});

module.exports = router;
