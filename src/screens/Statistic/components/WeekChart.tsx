// react
import React from "react";
import { View, Text } from "react-native";
// components
import LineCharts from "../../../components/LineChart";
import Paginator from "./Paginator";

interface IWeekChart {
  onNextPress: () => void;
  onPrevPress: () => void;
  paginationText: string;
  suffixY?: string;
  weekData: { data: number[]; labels: string[] };
}

const WeekChart: React.FC<IWeekChart> = ({
  onNextPress,
  onPrevPress,
  paginationText,
  weekData,
  suffixY
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
