import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { Flight } from "../flights/flightSlice";

interface PassengerInfo { name: string; email: string; phone: string; age: number; }
export interface Booking { _id: string; flightId: Flight; passengerInfo: PassengerInfo; totalPrice: number; travelDate: string; }

interface BookingState { booking: Booking | null; loading: boolean; error: string | null; }

const initialState: BookingState = { booking: null, loading: false, error: null };

export const createBooking = createAsyncThunk(
  "booking/create",
  async (data: { flightId: string; passengerInfo: PassengerInfo; totalPrice: number; travelDate: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/booking/create", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Booking failed");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking", initialState, reducers: { clearBooking(state) { state.booking = null; state.error = null; } },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createBooking.fulfilled, (state, action) => { state.loading = false; state.booking = action.payload; })
      .addCase(createBooking.rejected, (state, action: any) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
