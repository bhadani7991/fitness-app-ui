import { Workout } from "../pages/workout/model/workouts";

// Regular expression for validating an email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateLoginRequest = (email: string, password: string) => {
  // Regular expression for validating an email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression for validating a password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if email and password are provided
  if (!email || !password) {
    throw new Error("Invalid Credentials");
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    throw new Error("Invalid Credentials");
  }

  // Validate password format
  if (!passwordRegex.test(password)) {
    throw new Error("Invalid Credentials");
  }

  return true; // Valid email and password
};

export const validateSignupRequest = (
  email: string,
  password: string,
  name: string,
  age: number,
  weight: number
) => {
  // Regular expression for validating a password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if all details are provided
  if (!email || !password || !age || !weight || !name) {
    throw new Error("Invalid Details");
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    throw new Error("Email should be in correct format");
  }

  // Validate password format
  if (!passwordRegex.test(password)) {
    throw new Error("Password should be Strong");
  }

  if (age < 0) {
    throw new Error("Invalid age");
  }
  if (weight < 0) {
    throw new Error("Invalid weight");
  }

  return true;
};

export const validateGoalsData = (
  workoutsPerWeek: number,
  targetWeight: number,
  caloriesBurnedGoal: number
) => {
  if (workoutsPerWeek <= 0) {
    throw new Error("Invalid workoutsPerWeek");
  }
  if (targetWeight <= 0) {
    throw new Error("Invalid TargetWeight");
  }
  if (caloriesBurnedGoal <= 0) {
    throw new Error("Invalid CaloriesBurnedGoal");
  }
};

const validateRequiredForString = (value: string) => !!value.length;
const validateRequiredForNumber = (value: number) => value > 0;
const validateDateField = (value: string) => {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return dateRegex.test(value);
};
export function validateWorkout(workout: Workout) {
  return {
    type: !validateRequiredForString(workout.type)
      ? "please enter correct type"
      : "",
    duration: !validateRequiredForNumber(workout.duration)
      ? "please enter correct duration "
      : "",
    caloriesBurned: !validateRequiredForNumber(workout.caloriesBurned)
      ? "please enter correct Calories Burned"
      : "",
    updatedAt: !validateDateField(workout.updatedAt.toString())
      ? "please enter date in yyyy-mm-dd"
      : "",
  };
}
