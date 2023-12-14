// pages/api/editTodo.js
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/middleware/mongoose";
import Users, { UserDocument } from "../../models/user";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      // Extract data from the request body
      const { token, title: originalTitle, editedTodo } = req.body;

      // Verify the token and get the user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.user_id;

      // Find the user by ID
      const user: UserDocument | null = await Users.findById(userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if a todo with the edited title already exists
      const existingTodo = user.todos.find(
        (todo) => todo.title === editedTodo.title
      );

      if (existingTodo && editedTodo.title !== originalTitle) {
        return res
          .status(400)
          .json({ error: "Todo with this title already exists" });
      }

      // Find and update the todo
      const todoIndex = user.todos.findIndex(
        (todo) => todo.title === originalTitle
      );
      if (todoIndex !== -1) {
        user.todos[todoIndex] = editedTodo;
        await user.save();

        res.status(200).json({ message: "Todo edited successfully" });
      } else {
        res.status(404).json({ error: "Todo not found" });
      }
    } catch (error) {
      // Handle errors and send an internal server error response
      console.error("Todo edit error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Return a Method Not Allowed response for non-PUT requests
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

// Connect to the database before handling the request
export default connectDb(handler);
