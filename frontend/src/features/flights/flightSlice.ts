import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export interface Flight {
  _id: string; airlineName: string; airlineLogo?: string; flightNumber: string;
  from: string; to: string; departureTime: string; arrivalTime: string;
  duration: string; price: number; date: string;
}

interface FlightState {
  flights: Flight[]; loading: boolean; error: string | null;
  searchParams: { from: string; to: string; travelDate: string; passengers: number } | null;
}

const initialState: FlightState = { flights: [], loading: false, error: null, searchParams: null };

export const searchFlights = createAsyncThunk(
  "flights/search",
  async (params: { from: string; to: string; travelDate: string; passengers: number }, { rejectWithValue }) => {
    try {
      const res = await api.post("/flights/search", params);
      return { flights: res.data.flights, searchParams: params };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to search flights");
    }
  }
);

const flightSlice = createSlice({
  name: "flights", initialState, reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchFlights.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(searchFlights.fulfilled, (state, action) => { state.loading = false; state.flights = action.payload.flights; state.searchParams = action.payload.searchParams; })
      .addCase(searchFlights.rejected, (state, action: any) => { state.loading = false; state.error = action.payload; });
  }
});

export default flightSlice.reducer;
