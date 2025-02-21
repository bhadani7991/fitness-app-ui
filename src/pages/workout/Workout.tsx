import { useEffect, useState } from "react";
import WorkoutModal from "./model/WorkoutModel";
import getAxiosError from "../../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../appConstant";
import { Box, Tab, Tabs } from "@mui/material";
import { Workout } from "./model/workouts";
import WorkoutTrendChart from "./model/WorkoutTrendChart";

interface WorkoutProps {}

const Workouts: React.FC<WorkoutProps> = ({}) => {
  const [workoutData, setWorkoutData] = useState<Workout[]>([]);
  const fetchWorkoutData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/workouts`, {
        withCredentials: true,
      });

      const formattedData = response.data.entity.map((workout: any) => ({
        ...workout,
        updatedAt: workout.updatedAt.split("T")[0], // Keep only date
      }));

      console.log(formattedData);
      setWorkoutData(formattedData);
    } catch (error) {
      const appError = getAxiosError(error);
      toast.error(appError.errorMessage, { toastId: "fetchWorkoutDataError" });
    }
  };
  const [activeTab, setActiveTab] = useState(0); // 0: History, 1: Statistics

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetchWorkoutData();
  }, []);
  return (
    <div>
      <div>
        <h1 className="font-bold text-center text-3xl">Workout Report</h1>
      </div>
      <div>
        <Box sx={{ width: "100%" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Workout Details" />

            <Tab label="Workout Trends" />
          </Tabs>
          {/* Conditionally render the content based on the active tab */}
          {activeTab === 0 && <WorkoutModal data={workoutData} />}{" "}
          {/* Render WorkoutHistory */}
          {activeTab === 1 && <WorkoutTrendChart />}{" "}
          {/* Render WorkoutStatistics */}
        </Box>
      </div>
    </div>
  );
};
export default Workouts;
