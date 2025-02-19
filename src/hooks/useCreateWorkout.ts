import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Workout } from "../pages/workout/model/workouts";
import getAxiosError from "../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../appConstant";
import { duration } from "@mui/material";

//CREATE hook (post new user to api)
export function useCreateWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workout: Workout) => {
      try {
        const workoutRequest = [
          {
            type: workout.type,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            updatedAt: workout.updatedAt,
          },
        ];
        const response = await axios.post(
          `${BASE_URL}/workouts`,
          workoutRequest,
          {
            withCredentials: true,
          }
        );
        toast.info("Workout saved successfully", {
          toastId: "workoutSaveSuccess",
        });
        return response.data.message;
      } catch (error) {
        const appError = getAxiosError(error);
        toast.error(appError.errorMessage, { toastId: "savingWorkoutError" });
      }
    },
    //client side optimistic update
    onMutate: (newWorkoutInfo: Workout) => {
      queryClient.setQueryData(
        ["workouts"],
        (prevWorkouts: any) =>
          [
            ...prevWorkouts,
            {
              ...newWorkoutInfo,
            },
          ] as Workout[]
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
