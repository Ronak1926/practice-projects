import { User } from "../models/user.model.js";

export const addPassword = async (req, res) => {
  try {
    const { password, description } = req.body;

    if (!password || !description) {
      return res.status(400).json({ message: "Password and description are required." });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.generatedPasswords.push({
      password,
      description,
      createdAt: new Date(),
    });

    await user.save();

    const passwords = [...user.generatedPasswords].sort((a, b) => b.createdAt - a.createdAt);
    return res.status(201).json({ passwords });
  } catch (error) {
    console.log("Error in addPassword controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getPasswords = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("generatedPasswords");
    if (!user) return res.status(404).json({ message: "User not found." });

    const passwords = [...user.generatedPasswords].sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json({ passwords });
  } catch (error) {
    console.log("Error in getPasswords controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};