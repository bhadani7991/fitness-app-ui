export interface Workout {
  _id?: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  updatedAt: string;
}

export interface WorkoutTrend {
  week: string;
  totalCaloriesBurned: number;
  averageDuration: number;
}
