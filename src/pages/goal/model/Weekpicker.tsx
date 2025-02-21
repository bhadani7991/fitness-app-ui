import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { addDateRange } from "../../../utils/goalProgressSlice";

const WeekPicker: React.FC = (props) => {
  const [currentDate, setCurrentDate] = useState<DateObject[]>([]);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Select a Week:</h2>
      <DatePicker
        id={`goal_progress_date_range`}
        name={`goal_progress_date_range`}
        format="MM/DD/YYYY"
        className="green"
        dateSeparator=" ~ "
        range
        weekPicker
        placeholder="Pick a Week"
        rangeHover
        style={{ height: "36px", marginTop: "8px" }}
        value={currentDate}
        onChange={(value) => {
          setCurrentDate(value);
          const dateRange = {
            weekStart: `${currentDate[0]?.day}-${currentDate[0]?.month.number}-${currentDate[0]?.year}`, // Start of the week date
            weekEnd: `${currentDate[1]?.day}-${currentDate[1]?.month.number}-${currentDate[1]?.year}`, // End of the week date
          };

          dispatch(addDateRange(dateRange));
        }}
      />
    </div>
  );
};

export default WeekPicker;
