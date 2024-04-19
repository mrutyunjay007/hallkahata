import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./features/connection/connectionSlice";
import customerNameReducer from "./features/customerName/customerNameSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      connection: connectionReducer,
      costomerName: customerNameReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
