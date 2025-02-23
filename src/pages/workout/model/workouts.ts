export interface Workout {
  _id?: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  updatedAt: Date;
}

export interface WorkoutTrend {
  week: string;
  totalCaloriesBurned: number;
  averageDuration: number;
}

export enum Workoutkey {
  ID = "_id",
  UPDATED_AT = "updatedAt",
  TYPE = "type",
  DURATION = "duration",
  CALORIES_BURNED = "caloriesBurned",
}

export enum WorkoutHeader {
  ID = "ID",
  UPDATED_AT = "DATE",
  TYPE = "WORKOUT",
  DURATION = "DURATION(In Minutes)",
  CALORIES_BURNED = "CALORIES BURNED(In Cal)",
}
