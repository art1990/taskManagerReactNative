// react
import React from "react";
import { LineChart as Chart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
// utils
import { generateWeekForTime, IWeekData } from "../../utils/date";
// interface

export interface IWeeksList {
  weeksList?: {
    startTaskTime: number;
    duration: number;
    id: string;
    endTime: number;
  }[];
  weekData: IWeekData;
  suffixY?: string;
}

const chartConfig = {
  backgroundColor: "red",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
  style: {
    borderRadius: 0
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "rgba(0, 0, 0, .4)"
  }
};

const LineChart: React.FC<IWeeksList> = ({ weekData, suffixY = "" }) => {
  const { labels, data } = weekData;
  const dataForChart = {
    labels,
    datasets: [{ data, strokeWidth: 2 }]
  };
  return (
    <Chart
      data={dataForChart}
      width={Dimensions.get("window").width}
      height={220}
      yAxisLabel=""
      yAxisSuffix={suffixY}
      yAxisInterval={1}
      chartConfig={chartConfig}
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

export default LineChart;
