// react
import React from "react";
// react-native-chart
import { BarChart as Chart } from "react-native-chart-kit";
// type
import { IWeeksListProps } from "../../types";

const BarChart: React.FC<IWeeksListProps> = ({ weekData }) => <Chart />;

export default BarChart;
