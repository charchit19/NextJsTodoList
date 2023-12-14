import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/middleware/mongoose";
import Users, { UserDocument } from "../../models/user";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // Extract token from the request query
      const token = req.query.token;

      // Verify the token and get the user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.user_id;

      // Find the user by ID and populate the 'todos' field
      const user: UserDocument | null = await Users.findById(userId).populate(
        "todos"
      );

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Extract todos from the user object
      const todos = user.todos;

      // Send the todos as a response
      res.status(200).json({ todos });
    } catch (error) {
      // Handle errors and send an internal server error response
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Return a Method Not Allowed response for non-GET requests
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

// Connect to the database before handling the request
export default connectDb(handler);
