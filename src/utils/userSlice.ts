import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../pages/auth/model/login";

const userSlice = createSlice({
  name: "User",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
