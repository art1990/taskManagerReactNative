// react
import React from "react";
import { View, Text } from "react-native";
// components
import LineCharts from "../../../components/LineChart";
import Paginator from "./Paginator";
// types
import { IWeekChartProps } from "../../../types";

const WeekChart: React.FC<IWeekChartProps> = ({
  onNextPress,
  onPrevPress,
  paginationText,
  weekData,
  suffixY,
}) => (
  <>
    <Paginator
      onNextPress={onNextPress}
      onPrevPress={onPrevPress}
      text={paginationText}
    />
    <LineCharts weekData={weekData} suffixY={suffixY} />
  </>
);

export default WeekChart;
