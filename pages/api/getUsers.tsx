import { NextApiRequest, NextApiResponse } from "next";
import Users from "../../models/user";
import connectDb from "@/middleware/mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let users = await Users.find();
  res.status(200).json({ users });
};

export default connectDb(handler);
