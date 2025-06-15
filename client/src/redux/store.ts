import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"
import authReducer from "./slices/authSlice"
import loadingReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
