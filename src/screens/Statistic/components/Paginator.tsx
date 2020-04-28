// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import IconButton from "../../../components/IconButton";
// styles
import Styles from "../../../assets/styles";
// types
import { IWeekChartProps } from "./WeekChart";
// colors
import { Colors } from "../../../assets/styles/constants";

export interface IPaginatorProps {
  chartName: string;
  onNextPress: () => void;
  onPrevPress: () => void;
  text?: string;
  horizontalLabels?: IWeekChartProps["weekData"]["labels"];
}

const Paginator: React.FC<IPaginatorProps> = ({
  text,
  chartName,
  onNextPress,
  onPrevPress,
  horizontalLabels,
}) => {
  const paginationText =
    text || `${horizontalLabels[0]} - ${horizontalLabels.slice(-1)[0]}`;

  return (
    <View style={Styles.rowSpaceBetween}>
      <View style={styles.navSection}>
        <IconButton icon="prev" onPress={onPrevPress} />
        <Text style={[styles.text, styles.paginationText]}>
          {paginationText}
        </Text>
        <IconButton icon="next" onPress={onNextPress} />
      </View>
      <Text style={styles.text}>{chartName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navSection: {
    marginLeft: 45,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.chartLabelColor,
    fontSize: 12,
    lineHeight: 18,
  },
  paginationText: {
    marginHorizontal: 5,
  },
});

export default Paginator;
