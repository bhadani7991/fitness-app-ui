import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Workout } from "../pages/workout/model/workouts";
import getAxiosError from "../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../appConstant";

//UPDATE hook (put user in api)
export function useUpdateWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workout: Workout) => {
      //send api update request here
      try {
        const response = await axios.put(
          `${BASE_URL}/workout/${workout._id}`,
          {
            type: workout.type,
            caloriesBurned: workout.caloriesBurned,
            duration: workout.duration,
            updatedAt: workout.updatedAt,
          },
          { withCredentials: true }
        );
        toast.info(`Workout updated successfully`);
        return response.data.workout;
      } catch (error) {
        const appError = getAxiosError(error);
        toast.error(appError.errorMessage, { toastId: "updateWorkoutError" });
      }
    },
    //client side optimistic update
    onMutate: (newWorkoutInfo: Workout) => {
      queryClient.setQueryData(["workouts"], (prevWorkouts: any) =>
        prevWorkouts?.map((prevWorkout: Workout) =>
          prevWorkout._id === newWorkoutInfo._id ? newWorkoutInfo : prevWorkout
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
