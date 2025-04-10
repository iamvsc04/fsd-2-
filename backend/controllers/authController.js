const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "1h" });

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User Already exists" });
  const user = await User.create({ name, email, password });
  res.json({
    _id: user.id,
    name: user.name,
    token: generateToken(user._id),
  });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: (await user).name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
