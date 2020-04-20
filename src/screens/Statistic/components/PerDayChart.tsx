// react
import React, { useState } from "react";
// components
import BarChart from "../../../components/BarChart";
import Button from "../../../components/Button";
import DatePicker from "@react-native-community/datetimepicker";
// utils
import { fromUnixTime, format, getUnixTime } from "date-fns";
// types
import { IDayChartProps } from "../../../types/index";

const PerDayChart: React.FC<IDayChartProps> = ({
  dayData,
  updateDate,
  currentDate,
}) => {
  const [show, setShow] = useState(false);
  const date = fromUnixTime(currentDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    updateDate(currentDate);
  };

  return (
    <>
      <BarChart dayData={dayData} />
      <Button onPress={() => setShow(true)}>Show</Button>
      {show && (
        <DatePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default PerDayChart;
