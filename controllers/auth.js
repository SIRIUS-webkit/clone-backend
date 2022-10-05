import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "No user found!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Username and password are incorrect!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1hr" }
    );

    res.status(200).json({ data: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exits" });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "Password doesn't match" });

    const hashedpassword = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashedpassword, name });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1hr",
    });
    res.cookie("token", token);
    res.status(200).json({ data: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;
  if (userId) {
    try {
      const user = await User.findById({ _id: userId });
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(400).json({ message: "No data found!" });
    }
  }
};
