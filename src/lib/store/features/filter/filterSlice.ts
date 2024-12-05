import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IFilter {
  color: string;
  date: string;
  searchLoading: boolean;
}

const initialState: IFilter = {
  color: "",
  date: "",
  searchLoading: false,
};

export const filterSlice = createSlice({
  name: "filterinfo",
  initialState,
  reducers: {
    selectColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    selectDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },

    searching: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectColor, selectDate, searching } = filterSlice.actions;

export default filterSlice.reducer;
