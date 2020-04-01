// react
import React from "react";
import { View, Text } from "react-native";
// components
import Title from "../../components/Title";
import LineCharts from "../../components/LineChart";
import Paginator from "./components/Paginator";
// hooks
import { useCharts } from "../../hooks/useCharts";

interface IStatistic {}

const Statistic: React.FC<IStatistic> = () => {
  const {} = useCharts();

  return (
    <View>
      <Title text="Statistic" />
      <Paginator />
      <LineCharts />
    </View>
  );
};

export default Statistic;
