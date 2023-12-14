import { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
import Users from "../../models/user";
import connectDb from "@/middleware/mongoose";
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const email = req.body.email;
      const existingUser = await Users.findOne({ email });
      const secretKey = JWT_SECRET;
      let finalToken = null;
      if (existingUser) {
        console.log("User already exists in the database");
        const token = jwt.sign(
          { user_id: existingUser._id, email: email },
          secretKey,
          { expiresIn: "1h" }
        );
        finalToken = token;
      } else {
        const newUser = new Users({ email, password: "" });
        await newUser.save();
        console.log("New user created in the database");
        const token = jwt.sign(
          { user_id: newUser._id, email: email },
          secretKey,
          { expiresIn: "1h" }
        );
        finalToken = token;
      }
      res
        .status(200)
        .json({ message: "Login successful", finalToken, username: email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
