import { createSlice } from "@reduxjs/toolkit";
import { currentLoggedEmployee, loginEmployee } from "./authAction";

let authSlice = createSlice({
  name: "auth",
  initialState: {
    employee: null,
    isHydrating: true,
    isLoading: false,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employee = action.payload;
      state.isLoading = false;
    },
    removeEmployee: (state) => {
      state.employee = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmployee.pending, (state) => {
        state.isLoading = true;
        state.isHydrating = false;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.isLoading = false;
        state.isHydrating = false;
      })
      .addCase(loginEmployee.rejected, (state) => {
        state.isLoading = false;
        state.isHydrating = false;
      })
      .addCase(currentLoggedEmployee.pending, (state) => {
        state.isHydrating = true;
      })
      .addCase(currentLoggedEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.isHydrating = false;
      })
      .addCase(currentLoggedEmployee.rejected, (state) => {
        state.isHydrating = false;
      });
  },
});
export let { addEmployee, removeEmployee } = authSlice.actions;
export default authSlice.reducer;
