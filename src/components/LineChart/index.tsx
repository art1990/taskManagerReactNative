// react
import React from "react";
import { LineChart as Chart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

interface ILineChart {}

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ],
      strokeWidth: 2
    }
  ]
};

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

const LineChart: React.FC<ILineChart> = () => {
  return (
    <Chart
      data={data}
      width={Dimensions.get("window").width}
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
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
