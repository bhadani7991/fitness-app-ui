import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import getAxiosError from "../../../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../appConstant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addGoal } from "../../../utils/goalSlice";
import { RootState } from "../../../utils/appStore";

export default function GoalModal() {
  const dispatch = useDispatch();
  const activeGoalData: any = useSelector((store: RootState) => store.goal);
  const fetchActiveGoal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/active/goal`, {
        withCredentials: true,
      });
      dispatch(addGoal(response.data.entity));
    } catch (error) {
      const appError = getAxiosError(error);
      toast.error(appError.errorMessage, { toastId: "fetchActiveGoalError" });
    }
  };

  useEffect(() => {
    fetchActiveGoal();
  }, []);
  return (
    <Card sx={{ minWidth: 275 }} className="bg-white shadow-xl rounded-lg p-6">
      <CardContent>
        <Typography className="font-bold text-center text-3xl text-green-500 mb-4">
          Active Goal
        </Typography>

        {/* Check if activeGoalData is available */}
        {activeGoalData ? (
          <div className="space-y-4">
            <Typography
              variant="h6"
              component="div"
              className="text-lg text-gray-700 font-semibold"
            >
              Workouts Per Week:{" "}
              <span className="text-green-500">
                {activeGoalData.workoutsPerWeek || "Not set"}
              </span>
            </Typography>

            <Typography
              variant="h6"
              component="div"
              className="text-lg text-gray-700 font-semibold"
            >
              Target Weight:{" "}
              <span className="text-green-500">
                {activeGoalData.targetWeight || "Not set"}
              </span>
            </Typography>

            <Typography
              variant="h6"
              component="div"
              className="text-lg text-gray-700 font-semibold"
            >
              Calories Burned Goal:{" "}
              <span className="text-green-500">
                {activeGoalData.caloriesBurnedGoal || "Not set"}
              </span>
            </Typography>
          </div>
        ) : (
          <Typography
            variant="h5"
            component="div"
            className="text-center text-gray-400"
          >
            No active goal set
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
