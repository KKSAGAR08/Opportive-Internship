const jwt = require("jsonwebtoken");

exports.generateToken = async (userID, res) => {
  try {
    const token = await jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: "7D",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
    });

    return token;
    
  } catch (error) {
    res.status(400).json({ message: "Cannot generate token" });
  }
};
