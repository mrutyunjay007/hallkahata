import mongoose, { Document, Schema } from "mongoose";

export interface IBill extends Document {
  sellerNumber: string;
  customerNumber: string;
  customerName: string;
  amount: number;
  paymentType: string;
  createdAt: Date;
}

const BillSchema: Schema<IBill> = new mongoose.Schema({
  sellerNumber: {
    type: String,
    ref: "User",
    required: true,
  },
  customerNumber: {
    type: String,
    ref: "User",
    required: true,
  },
  customerName: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
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
