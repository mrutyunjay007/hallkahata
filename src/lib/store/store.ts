import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./features/connection/connectionSlice";
import connectionNameReducer from "./features/connectionName/connectionNameSlice";
import authReducer from "./features/auth/authSlice";
import notificationReducer from "./features/notification/notificationSlice";
import filterReducer from "./features/filter/filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      connection: connectionReducer,
      connectionName: connectionNameReducer,
      auth: authReducer,
      notification: notificationReducer,
      filter: filterReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
