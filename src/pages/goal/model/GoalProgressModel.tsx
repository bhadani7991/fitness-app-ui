import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import getAxiosError from "../../../utils/axiosError";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../appConstant";
import { addGoalProgress } from "../../../utils/goalProgressSlice";
import { RootState } from "../../../utils/appStore";
interface GoalProgressModelProps {}
const GoalProgressModel: React.FC<GoalProgressModelProps> = (props) => {
  const dispatch = useDispatch();
  const progress = useSelector((store: RootState) => store.goalProgress) ?? {
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

  const fetchGoalProgress = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/goal/progress`, {
        withCredentials: true,
      });
      dispatch(addGoalProgress(response.data.progress));
    } catch (error) {
      const appError = getAxiosError(error);
      toast.error(appError.errorMessage, { toastId: "fetchGoalProgressError" });
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
  }, []);
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
