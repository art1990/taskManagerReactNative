// react
import React, { useState } from "react";
// components
import BarChart from "../../../components/BarChart";
import Button from "../../../components/Button";
import DatePicker from "@react-native-community/datetimepicker";
import InputWithIcon from "../../../components/InputWithIcon";
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
      <InputWithIcon
        icon="calendar"
        disabled
        onPress={() => setShow(true)}
        value={format(date, "MMM d yyyy")}
      />
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
