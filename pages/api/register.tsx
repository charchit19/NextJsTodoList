// pages/api/register.js
import connectDb from "@/middleware/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import Users from "../../models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password, confirmPassword } = req.body;

      // Check if the email already exists in the database
      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res.status(401).json({ message: "User with this email already exists" });
      }

      if (password !== confirmPassword) {
        return res.status(401).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({ email, password: hashedPassword ,todos: []});
      await newUser.save();
      console.log(newUser);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
