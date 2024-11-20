import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IConnectionName {
  userName: string;
  userType: string;
}

const initialState: IConnectionName = {
  userName: "",
  userType: "",
};

export const connectionNameSlice = createSlice({
  name: "connectionName",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IConnectionName>) => {
      state.userName = action.payload.userName;
      state.userType = action.payload.userType;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = connectionNameSlice.actions;

export default connectionNameSlice.reducer;
