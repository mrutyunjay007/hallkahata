import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  userName: string;
  phoneNumber: number;
  profilePic: string;
  password: string;
  verifyCode: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profilePic: String,
  verifyCode: {
    type: String,
  },
});

// user model there then return or create new one
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

//export
export default UserModel;
