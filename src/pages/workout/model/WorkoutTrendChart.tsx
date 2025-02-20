import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { WorkoutTrend } from "./workouts";
import getAxiosError from "../../../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../appConstant";

const WorkoutTrendChart = () => {
  const [workoutTrendsData, setWorkoutTrendData] = useState<WorkoutTrend[]>([]);

  const fetchWorkoutTrendData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/workout/trends`, {
        withCredentials: true,
      });
      setWorkoutTrendData(response.data?.trends);
    } catch (error) {
      const appError = getAxiosError(error);
      toast.error(appError.errorMessage, {
        toastId: "fetchWorkoutTrendDataError",
      });
    }
  };

  useEffect(() => {
    fetchWorkoutTrendData();
  }, []);
  return (
    <BarChart width={900} height={600} data={workoutTrendsData}>
      <XAxis dataKey="week" stroke="#8884d8" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="totalCaloriesBurned" fill="#8884d8" barSize={20} />
      <Bar dataKey="averageDuration" fill="#8884d8" barSize={20} />
    </BarChart>
  );
};

export default WorkoutTrendChart;
