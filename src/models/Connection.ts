import mongoose, { Document, Schema } from "mongoose";

export interface IConnection extends Document {
  sellerNumber: string;
  customerNumber: string;
  customerName: string;
  amount: number;
}

const ConnectionSchema: Schema<IConnection> = new mongoose.Schema({
  sellerNumber: {
    type: String,
    ref: "User",
  },
  customerNumber: {
    type: String,
    ref: "User",
  },

  customerName: {
    type: String,
  },

  amount: Number,
});

// user model there then return or create new one
const ConnectionModel =
  (mongoose.models.Connection as mongoose.Model<IConnection>) ||
  mongoose.model<IConnection>("Connection", ConnectionSchema);

//export
export default ConnectionModel;
