// react
import React from "react";
import { LineChart as Chart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width * 0.95;
// types
import { IWeeksListProps } from "../../types";
// colors
import { Colors } from "../../assets/styles/constants";

const chartConfig = {
  backgroundColor: "red",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
  labelColor: (opacity = 1) => Colors.chartLabelColor,
  style: {
    borderRadius: 0,
  },

  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "rgba(0, 0, 0, .4)",
  },

  propsForBackgroundLines: {
    strokeDasharray: false,
  },
};

const LineChart: React.FC<IWeeksListProps> = ({ weekData, suffixY = "" }) => {
  const { labels, data } = weekData;
  const dataForChart = {
    labels,
    datasets: [{ data, strokeWidth: 2 }],
  };
  return (
    <Chart
      data={dataForChart}
      width={screenWidth}
      withInnerLines={false}
      height={220}
      yAxisLabel=""
      yAxisSuffix={suffixY}
      yAxisInterval={1}
      chartConfig={chartConfig}
      style={{
        marginVertical: 6,
        borderRadius: 16,
        paddingRight: 36,
      }}
    />
  );
};

export default LineChart;
