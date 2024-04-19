import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICustomerName {
  userName: string;
}

const initialState: ICustomerName = {
  userName: "",
};

export const customerNameSlice = createSlice({
  name: "cusromerName",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ICustomerName>) => {
      state.userName = action.payload.userName;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = customerNameSlice.actions;

export default customerNameSlice.reducer;
