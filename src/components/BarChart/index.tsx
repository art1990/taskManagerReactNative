// react
import React from "react";
// react-native-chart
import StackedBarChart from "./StackedBarChart";
import { Dimensions } from "react-native";
// type
import { IDayChartProps } from "../../types";
// colors
import { Colors } from "../../assets/styles/constants";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
  labelColor: (opacity = 1) => Colors.chartLabelColor,
  style: {
    borderRadius: 0,
  },
  propsForBackgroundLines: {
    strokeDasharray: false,
  },
  renderVerticalLabels: {
    paddingRight: 2,
  },
};

const BarChart: React.FC<IDayChartProps> = ({ dayData }) => {
  const data = {
    labels: [2, 4, 6, 8, 10, 12, 2, 4, 6, 8, 10, 12],
    data: dayData.data,
    barColors: dayData.barColors,
  };

  return (
    <StackedBarChart
      data={data}
      height={220}
      width={screenWidth}
      chartConfig={chartConfig}
      decimalPlaces={0}
    />
  );
};

export default BarChart;
