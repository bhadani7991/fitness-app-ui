import { createSlice } from "@reduxjs/toolkit";

const goalProgressSlice = createSlice({
  name: "goalProgress",
  initialState: {
    goalProgress: null,
    weekStart: null,
    weekEnd: null,
  },
  reducers: {
    addGoalProgress: (state, action) => {
      state.goalProgress = action.payload;
    },
    addDateRange: (state, action) => {
      state.weekStart = action.payload.weekStart;
      state.weekEnd = action.payload.weekEnd;
    },
  },
});

export const { addGoalProgress, addDateRange } = goalProgressSlice.actions;
export default goalProgressSlice.reducer;
