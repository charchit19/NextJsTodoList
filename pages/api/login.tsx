// pages/api/login.js
import connectDb from "@/middleware/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import Users from "../../models/user";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Check if the email exists in the database
      const existingUser = await Users.findOne({ email });

      if (!existingUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const secretKey = JWT_SECRET;
      const token = jwt.sign(
        { user_id: existingUser._id, email: existingUser.email },
        secretKey,
        { expiresIn: "1h" }
      );

      // Additional logic for a successful login
      // For example, you might generate a JWT token and send it back to the client
      // For demonstration purposes, we're sending a simple success message
      // res.status(200).json({ message: "Login successful" });
      res.status(200).json({
        message: "Login successful",
        token,
        username: existingUser.email,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    const token = req.query.token;
    const secretKey = JWT_SECRET;
    // Decode Token
    try {
      const decoded = jwt.verify(token, secretKey);
      const username = decoded.email;
      res.status(200).json({ username });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
