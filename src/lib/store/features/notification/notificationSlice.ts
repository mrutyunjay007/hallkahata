import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INotice {
  id: string;
}

const initialState: INotice = {
  id: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = notificationSlice.actions;

export default notificationSlice.reducer;
