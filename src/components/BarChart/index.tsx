// react
import React from "react";
// react-native-chart
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
// type
import { IWeeksListProps } from "../../types";

const screenWidth = Dimensions.get("window").width;

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [100, 45, 28, 80, 99, 43],
//     },
//   ],
// };

const data = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
};

const chartConfig = {
  backgroundColor: "red",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
  style: {
    borderRadius: 0,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "rgba(0, 0, 0, .4)",
  },
};

const BarChart: React.FC<IWeeksListProps> = ({ weekData }) => (
  <StackedBarChart
    hideLegend
    data={data}
    height={220}
    width={screenWidth}
    chartConfig={chartConfig}
  />
);

export default BarChart;
