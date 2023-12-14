import mongoose, { ConnectOptions } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectDb =
  (
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
    options?: ConnectOptions
  ) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (mongoose.connection.readyState) {
      return handler(req, res);
    }
    await mongoose.connect(process.env.MONGODB_URI || "", options);
    return handler(req, res);
  };

export default connectDb;
