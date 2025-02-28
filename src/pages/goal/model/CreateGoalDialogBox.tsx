import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import getAxiosError from "../../../utils/axiosError";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../appConstant";
import { validateGoalsData } from "../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { addGoal } from "../../../utils/goalSlice";
import { RootState } from "../../../utils/appStore";

interface CreateGoalDialogBoxProps {
  isOpen: boolean;
  onClose: any;
}

const CreateGoalDialogBox: React.FC<CreateGoalDialogBoxProps> = ({
  onClose,
  isOpen,
}) => {
  const currentGoalData = useSelector((store: RootState) => store.goal) ?? {
    workoutsPerWeek: 0,
    targetWeight: 0,
    caloriesBurnedGoal: 0,
  };
  const [workoutsPerWeek, setWorkoutPerWeek] = React.useState<number>(
    currentGoalData?.workoutsPerWeek
  );
  const [targetWeight, setTargetWeight] = React.useState<number>(
    currentGoalData?.targetWeight
  );
  const [caloriesBurnedGoal, setCaloriedBurnedGoal] = React.useState<number>(
    currentGoalData?.caloriesBurnedGoal
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  const handleGoalSave = async () => {
    try {
      validateGoalsData(workoutsPerWeek, targetWeight, caloriesBurnedGoal);
      const response = await axios.post(
        `${BASE_URL}/goal`,
        {
          workoutsPerWeek,
          targetWeight,
          caloriesBurnedGoal,
        },
        { withCredentials: true }
      );

      dispatch(addGoal(response.data.entity));
    } catch (error) {
      const appError = getAxiosError(error);
      toast.error(appError.errorMessage, { toastId: "goalSaveError" });
    } finally {
      setIsDialogOpen(false);
    }
  };
  return (
    <Dialog
      open={isOpen && isDialogOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Typography variant="h6" className="font-bold">
          Add Goal
        </Typography>
        <TextField
          fullWidth
          label="Workouts Per Week"
          value={workoutsPerWeek}
          variant="standard"
          type="number"
          onChange={(e) => setWorkoutPerWeek(Number(e.target.value))}
          className="space-y-8"
        />
        <TextField
          fullWidth
          label="Target Weight(In Kg)"
          variant="standard"
          value={targetWeight}
          onChange={(e) => setTargetWeight(Number(e.target.value))}
          type="number"
          className="space-y-8"
        />
        <TextField
          fullWidth
          label="Target Calories Burned(In Cal)"
          type="number"
          value={caloriesBurnedGoal}
          onChange={(e) => setCaloriedBurnedGoal(Number(e.target.value))}
          variant="standard"
          className="space-y-8"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Close
        </Button>
        <Button color="primary" variant="contained" onClick={handleGoalSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateGoalDialogBox;
