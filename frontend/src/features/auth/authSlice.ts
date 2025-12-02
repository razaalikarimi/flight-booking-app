import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface User { id: string; name: string; email: string; }
interface AuthState { user: User | null; token: string | null; loading: boolean; error: string | null; }

const initialToken = localStorage.getItem("token");
const initialUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: initialUser ? JSON.parse(initialUser) : null,
  token: initialToken || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { logout(state) { state.user = null; state.token = null; state.error = null; localStorage.removeItem("token"); localStorage.removeItem("user"); } },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; state.token = action.payload.token; state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token); localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action: any) => { state.loading = false; state.error = action.payload; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
