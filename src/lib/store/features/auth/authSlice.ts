import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  userName: string;
  password: string;
  phoneNumber: string;
}

const initialState: IAuth = {
  userName: "",
  password: "",
  phoneNumber: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserNamePassword: (
      state,
      action: PayloadAction<{ userName: string; password: string }>
    ) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    addPhoneNumber: (state, action: PayloadAction<{ phoneNumber: string }>) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    removePassWord: (state) => {
      state.password = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserNamePassword, addPhoneNumber, removePassWord } =
  authSlice.actions;

export default authSlice.reducer;
