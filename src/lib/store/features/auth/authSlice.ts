import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

// Store auth data during sign-up
// and after auth, current user info will be stored except password

export interface IAuth {
  userName: string;
  password: string;
  phoneNumber: string;
  iAmCustomer: boolean;
}

const initialState: IAuth = {
  userName: "",
  password: "",
  phoneNumber: "",
  iAmCustomer: false, // after auth this will help to know that user is customer or seller
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

    AmICustomerOrSeller: (state, action: PayloadAction<boolean>) => {
      state.iAmCustomer = action.payload;
    },

    AddCurrentUserData: (
      state,
      action: PayloadAction<{ userName: string; phoneNumber: string }>
    ) => {
      state.userName = action.payload.userName;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserNamePassword,
  addPhoneNumber,
  removePassWord,
  AmICustomerOrSeller,
  AddCurrentUserData,
} = authSlice.actions;

export default authSlice.reducer;
