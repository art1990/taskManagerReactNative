// react
import React from "react";
// components
import BarChart from "../../../components/BarChart";
import DatePicker from "react-native-datepicker";
// utils
import { fromUnixTime, format } from "date-fns";
// types
import { IDayChartProps } from "../../../types/index";

const PerDayChart: React.FC<IDayChartProps> = ({
  dayData,
  updateDate,
  currentDate,
}) => {
  const date = fromUnixTime(currentDate);

  return (
    <>
      <BarChart dayData={dayData} />
      <DatePicker
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder="select date"
        format="MMM Do YYYY"
        // minDate="2016-05-01"
        // maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
          updateDate(date);
        }}
      />
    </>
  );
};

export default PerDayChart;
