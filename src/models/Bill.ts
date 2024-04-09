import mongoose, { Document, Schema } from "mongoose";

export interface IBill extends Document {
  seller: Schema.Types.ObjectId;
  customer: Schema.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const BillSchema: Schema<IBill> = new mongoose.Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

// user model there then return or create new one
const BillModel =
  (mongoose.models.Bill as mongoose.Model<IBill>) ||
  mongoose.model<IBill>("Bill", BillSchema);

//export
export default BillModel;
