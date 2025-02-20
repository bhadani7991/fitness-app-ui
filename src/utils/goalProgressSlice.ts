import { createSlice } from "@reduxjs/toolkit";

const goalProgressSlice = createSlice({
  name: "goalProgress",
  initialState: null,
  reducers: {
    addGoalProgress: (state, action) => action.payload,
  },
});

export const { addGoalProgress } = goalProgressSlice.actions;
export default goalProgressSlice.reducer;
