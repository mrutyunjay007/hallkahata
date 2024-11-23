import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IConnection {
  userName: string;
  amount: number;
  phoneNumber: string;
  userType: string;
  connectionId: string;
  billId: string;
}

const initialState: IConnection = {
  userName: "",
  amount: 0,
  phoneNumber: "",
  userType: "",
  connectionId: "",
  billId: "",
};

export const connectionSlice = createSlice({
  name: "connectioninfo",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{
        userName: string;
        amount: number;
        phoneNumber: string;
        userType: string;
      }>
    ) => {
      state.userName = action.payload.userName;
      state.amount = action.payload.amount;
      state.phoneNumber = action.payload.phoneNumber;
      state.userType = action.payload.userType;
    },
    addConnectionId: (state, action: PayloadAction<string>) => {
      state.connectionId = action.payload;
    },
    updateAmount: (state, action: PayloadAction<number>) => {
      state.amount = state.amount - action.payload;
    },

    billIdToDelete: (state, action: PayloadAction<string>) => {
      state.billId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, addConnectionId, updateAmount, billIdToDelete } =
  connectionSlice.actions;

export default connectionSlice.reducer;
