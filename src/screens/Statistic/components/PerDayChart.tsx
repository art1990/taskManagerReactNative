// react
import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
// components
import BarChart from "../../../components/BarChart";
import DatePicker from "@react-native-community/datetimepicker";
import InputWithIcon from "../../../components/InputWithIcon";
// utils
import { fromUnixTime, format } from "date-fns";
// types
import { IDayChartProps } from "../../../types/index";
// assets
import Styles from "../../../assets/styles";

const PerDayChart: React.FC<IDayChartProps> = ({
  dayData,
  updateDate,
  currentDate,
  inputStyle,
}) => {
  const [show, setShow] = useState(false);
  const date = fromUnixTime(currentDate);

  const onChange = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      updateDate(currentDate);
    },
    [date, setShow, updateDate]
  );

  return (
    <>
      <BarChart dayData={dayData} yLabel="min" xLabelsList={["am", "pm"]} />
      <InputWithIcon
        inputStyle={inputStyle}
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
