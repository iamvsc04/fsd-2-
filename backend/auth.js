const jwt = require("jsonwebtoken");

const User = require("./models/User");

const verify = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "TOken missing" });
  try {
    const real = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await User.findById(real.id).select("-password");
    next();
  } catch (err) {
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = verify;
