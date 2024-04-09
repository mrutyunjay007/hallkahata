import mongoose, { Document, Schema } from "mongoose";

export interface IConnection extends Document {
  seller: Schema.Types.ObjectId;
  customer: Schema.Types.ObjectId;
  amount: number;
}

const ConnectionSchema: Schema<IConnection> = new mongoose.Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
});

// user model there then return or create new one
const ConnectionModel =
  (mongoose.models.Connection as mongoose.Model<IConnection>) ||
  mongoose.model<IConnection>("Connection", ConnectionSchema);

//export
export default ConnectionModel;
