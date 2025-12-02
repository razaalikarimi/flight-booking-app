import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import flightReducer from "../features/flights/flightSlice";
import bookingReducer from "../features/booking/bookingSlice";

export const store = configureStore({
  reducer: { auth: authReducer, flights: flightReducer, booking: bookingReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
