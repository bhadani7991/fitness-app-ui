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
  // Regular expression for validating an email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
