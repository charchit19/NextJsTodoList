import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/middleware/mongoose";
import Users, { UserDocument } from "../../models/user";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const token = req.query.token;
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const userId = decoded.user_id;

      const title = req.query.title;
      const user: UserDocument | null = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.todos = user.todos.filter((todo) => todo.title !== title);
      await user.save();

      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
