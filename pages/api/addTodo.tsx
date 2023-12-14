import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/middleware/mongoose";
import Users, { UserDocument } from "../../models/user"; // Assuming your User model is appropriately defined
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { token, title, desc } = req.body as {
        token: string;
        title: string;
        desc: string;
      };

      const decoded: any = jwt.verify(token, JWT_SECRET);
      const userId = decoded.user_id;

      const user: UserDocument | null = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if a todo with the given title already exists
      const existingTodo = user.todos.find((todo) => todo.title === title);
      if (existingTodo) {
        return res
          .status(400)
          .json({ error: "Todo with this title already exists" });
      }

      user.todos.push({ title, desc });
      await user.save();

      res.status(201).json({ message: "Todo added successfully" });
    } catch (error) {
      console.error("Todo addition error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
