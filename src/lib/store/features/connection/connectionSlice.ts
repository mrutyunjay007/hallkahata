import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IConnection {
  userName: string;
  amount: number;
  phoneNumber: string;
}

const initialState: IConnection = {
  userName: "",
  amount: 0,
  phoneNumber: "",
};

export const connectionSlice = createSlice({
  name: "connectioninfo",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IConnection>) => {
      state.userName = action.payload.userName;
      state.amount = action.payload.amount;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = connectionSlice.actions;

export default connectionSlice.reducer;
