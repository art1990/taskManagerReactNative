// react
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
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
import { Colors } from "../../../assets/styles/constants";

const PerDayChart: React.FC<IDayChartProps> = ({
  dayData,
  updateDate,
  currentDate,
  inputStyle,
  chartName,
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
    <View style={styles.container}>
      <Text style={styles.text}>{chartName}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  text: {
    position: "absolute",
    zIndex: 1,
    top: 8,
    right: 0,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.chartLabelColor,
  },
});

export default PerDayChart;
