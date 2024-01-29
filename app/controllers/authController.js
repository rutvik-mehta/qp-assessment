const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await db.users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signUp,
  login,
};
