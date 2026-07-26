import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,  // { id, name, email }
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
  },
})

export const { setCurrentUser, logout } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.currentUser
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated

export default authSlice.reducer
