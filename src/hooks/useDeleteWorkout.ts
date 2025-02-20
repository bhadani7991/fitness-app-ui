import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Workout } from "../pages/workout/model/workouts";
import axios from "axios";
import { BASE_URL } from "../appConstant";
import { toast } from "react-toastify";
import getAxiosError from "../utils/axiosError";

//DELETE hook (delete user in api)
export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      try {
        const response = await axios.delete(`${BASE_URL}/workout/${userId}`, {
          withCredentials: true,
        });
        toast.info("Workout deleted successfully");
        return response.data;
      } catch (error) {
        const appError = getAxiosError(error);
        toast.error(appError.errorMessage, { toastId: "workoutDeleteMessage" });
      }
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ["workouts"],
        (prevUsers: Workout[] | undefined) => {
          if (!prevUsers) return prevUsers;

          // Filter out the workout with the given _id (userId)
          return prevUsers.filter((workout) => workout._id !== userId);
        }
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
};
