const User = require("../Model/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");

exports.signUP = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });

    if (newUser) {
      const token = await generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        status: "success",
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } else {
      return res.status(400).json({ message: "Cannot create Account" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.logIN = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid User" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid User" });

    await generateToken(user._id, res);

    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.logOUT = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ user:req.user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
