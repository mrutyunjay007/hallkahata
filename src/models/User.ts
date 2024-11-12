import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  userId: string;
  userName: string;
  phoneNumber: string;
  profilePic: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },

  profilePic: String,
});

// user model there then return or create new one
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

//export
export default UserModel;
