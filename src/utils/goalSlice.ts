import { createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goal",
  initialState: null,
  reducers: {
    addGoal: (state, action) => action.payload,
    removeGoal: (state, action) => null,
  },
});

export const { addGoal, removeGoal } = goalSlice.actions;
export default goalSlice.reducer;
