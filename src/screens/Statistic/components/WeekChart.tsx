// react
import React from "react";
import { View, StyleSheet } from "react-native";
// components
import LineCharts from "../../../components/LineChart";
import Paginator from "./Paginator";
// types
import { IPaginatorProps } from "./Paginator";

export interface IWeekChartProps {
  onNextPress: () => void;
  onPrevPress: () => void;
  paginationText?: IPaginatorProps["text"];
  chartName: IPaginatorProps["chartName"];
  suffixY?: string;
  weekData: { data: number[]; labels: string[] };
}

const WeekChart: React.FC<IWeekChartProps> = ({
  onNextPress,
  onPrevPress,
  paginationText,
  weekData,
  suffixY,
  chartName,
}) => (
  <View style={styles.container}>
    <Paginator
      onNextPress={onNextPress}
      onPrevPress={onPrevPress}
      text={paginationText}
      chartName={chartName}
      horizontalLabels={weekData.labels}
    />
    <LineCharts weekData={weekData} suffixY={suffixY} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});

export default WeekChart;
