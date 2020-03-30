// react
import React from "react";
import { View, Text } from "react-native";
// components
import Title from "../../components/Title";
import LineCharts from "../../components/LineChart";

export default () => {
  return (
    <View>
      <Title text="Statistic" />
      <LineCharts />
    </View>
  );
};
