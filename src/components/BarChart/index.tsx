// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
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

const BarChart: React.FC<IDayChartProps> = ({
  dayData,
  xLabelsList,
  yLabel,
}) => {
  const data = {
    labels: [2, 4, 6, 8, 10, 12, 2, 4, 6, 8, 10, 12],
    data: dayData.data,
    barColors: dayData.barColors,
  };

  const height = 220;

  return (
    <>
      <Text style={styles.text}>{yLabel}</Text>
      <View style={{ height: height - 22 }}>
        <StackedBarChart
          data={data}
          height={height}
          width={screenWidth}
          chartConfig={chartConfig}
          decimalPlaces={0}
        />
      </View>
      <View style={styles.xLabelSection}>
        {xLabelsList.map((el, i) => (
          <Text key={i} style={styles.text}>
            {el}
          </Text>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  xLabelSection: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    alignSelf: "flex-end",
  },
  text: {
    color: Colors.chartLabelColor,
  },
});

export default BarChart;
