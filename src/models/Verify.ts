import mongoose, { Schema } from "mongoose";

export interface IVerify {
  phoneNumber: string;
  code: string;
}

const VerifySchema: Schema<IVerify> = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// verify model there then return or create new one
const VerifyModel =
  (mongoose.models.Verify as mongoose.Model<IVerify>) ||
  mongoose.model<IVerify>("Verify", VerifySchema);

//export
export default VerifyModel;
