import { useQuery } from "@tanstack/react-query";
import getAxiosError from "../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../appConstant";
import { Workout } from "../pages/workout/model/workouts";

export function useGetUsers() {
  return useQuery<Workout[]>({
    queryKey: ["workouts"],

    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/workouts`, {
          withCredentials: true,
        });
        return response.data.entity;
      } catch (error) {
        const appError = getAxiosError(error);
        toast.error(appError.errorMessage, { toastId: "fetchUserError" });
      }
    },
    refetchOnWindowFocus: false,
  });
}
