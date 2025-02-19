import { Box, Grid, Grid2, Paper, Typography } from "@mui/material";
import { useState } from "react";

interface WorkoutProps {}

const Workout: React.FC<WorkoutProps> = (props) => {
  const [workoutDates] = useState(["2024-02-15", "2024-02-18", "2024-02-21"]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Get first and last day of the month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array of days
  const daysArray = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 ? day : null;
    }
  );
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {today.toLocaleString("default", { month: "long" })} {year}
      </Typography>
      <Grid container spacing={1}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Grid item xs={1.7} key={day}>
            <Typography variant="body2" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}
        {daysArray.map((day, index) => (
          <Grid item xs={1.7} key={index}>
            {day && (
              <Paper
                sx={{
                  textAlign: "center",
                  p: 1,
                  backgroundColor: workoutDates.includes(
                    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  )
                    ? "lightblue"
                    : "transparent",
                }}
              >
                {day}
              </Paper>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Workout;
