import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import getAxiosError from "../../../utils/axiosError";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, DATE_FORMATE_FOR_GOAL } from "../../../appConstant";
import { addGoalProgress } from "../../../utils/goalProgressSlice";
import { RootState } from "../../../utils/appStore";
interface GoalProgressModelProps {}
const GoalProgressModel: React.FC<GoalProgressModelProps> = (props) => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (store: RootState) => store.goalProgress.goalProgress
  ) ?? {
    workoutsCompleted: 0,
    workoutGoal: 1,
    workoutProgress: "0",
    caloriesBurned: 0,
    calorieGoal: 1,
    caloriesProgress: "0",
    currentWeight: 0,
    targetWeight: 1,
    weightProgress: "0",
  };
  const weekStart =
    useSelector((store: RootState) => store.goalProgress.weekStart) ??
    DATE_FORMATE_FOR_GOAL;
  const weekEnd =
    useSelector((store: RootState) => store.goalProgress.weekEnd) ??
    DATE_FORMATE_FOR_GOAL;

  const fetchGoalProgress = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/goal/progress`, {
        withCredentials: true,
        params: {
          weekStart: weekStart,
          weekEnd: weekEnd,
        },
      });
      dispatch(addGoalProgress(response.data.progress));
    } catch (error) {
      const appError = getAxiosError(error);
      dispatch(addGoalProgress({}));

      //toast.error("No Goal Found", { toastId: "fetchGoalProgressError" });
    }
  };
  const workoutProgressPercentage =
    (progress?.workoutsCompleted / progress.workoutGoal) * 100;
  const calorieProgressPercentage =
    (progress.caloriesBurned / progress.calorieGoal) * 100;
  const weightProgressPercentage =
    progress.currentWeight === progress.targetWeight
      ? 100 // Goal achieved
      : progress.targetWeight > progress.currentWeight
        ? (progress.currentWeight / progress.targetWeight) * 100 // Weight gain goal
        : (progress.targetWeight / progress.currentWeight) * 100; // Weight loss goal

  useEffect(() => {
    fetchGoalProgress();
  }, [weekStart, weekEnd]);

  if (!progress || Object.keys(progress).length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        {" "}
        {/* Center on the screen */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          {" "}
          {/* Card-like container */}
          <div className="text-gray-500 text-2xl font-semibold mb-4">
            <svg // Optional: Add an icon (e.g., a sad face or a warning icon)
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-2" // Center the icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />{" "}
              {/* Example warning icon */}
            </svg>
            No Goal Found For Selected Week
          </div>
          <p className="text-gray-400 text-lg">
            It seems there are no goals currently set. You can add a new goal to
            start tracking your progress.
          </p>
        </div>
      </div>
    );
  }
  return (
    <Box className="p-4 space-y-4">
      {/* Workouts Progress */}
      <Box>
        <Typography variant="h6">
          Workouts Progress: {progress.workoutsCompleted}/{progress.workoutGoal}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={workoutProgressPercentage}
          color="success"
        />
        <Typography variant="body2" className="text-center">
          {progress.workoutProgress}% Complete
        </Typography>
      </Box>

      {/* Calories Progress */}
      <Box>
        <Typography variant="h6">
          Calories Burned Progress: {progress.caloriesBurned}/
          {progress.calorieGoal}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={calorieProgressPercentage}
          color="success"
        />
        <Typography variant="body2" className="text-center">
          {progress.caloriesProgress}% Complete
        </Typography>
      </Box>

      {/* Weight Progress */}
      <Box>
        <Typography variant="h6">
          Weight Progress: {progress.currentWeight} kg / {progress.targetWeight}{" "}
          kg
        </Typography>
        <LinearProgress
          variant="determinate"
          value={weightProgressPercentage}
          color="success"
        />
        <Typography variant="body2" className="text-center">
          {progress.weightProgress}% Complete
        </Typography>
      </Box>
    </Box>
  );
};

export default GoalProgressModel;
