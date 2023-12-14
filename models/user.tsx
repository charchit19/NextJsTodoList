import mongoose, { Schema, Document, Model } from "mongoose";

export interface Todo {
  title: string;
  desc: string;
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  todos: Todo[];
}

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  todos: [
    {
      title: String,
      desc: String,
    },
  ],
});

// Check if the model already exists
const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
