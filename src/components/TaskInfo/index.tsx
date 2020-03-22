// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// utils
import { formatToUTCTime } from "../../utils/date";
// styles
import Styles from "../../assets/styles";

interface ITaskInfo {
  title: string;
  project: string;
  duration: number;
  background?: string;
}

const TaskInfo: React.FC<ITaskInfo> = ({
  title,
  project,
  duration,
  background
}) => (
  <View
    style={[
      Styles.rowSpaceBetween,
      styles.container,
      background && { backgroundColor: background }
    ]}
  >
    <View style={Styles.rowSpaceBetween}>
      <Text>title: {title} </Text>
      <Text>project: {project}</Text>
    </View>
    <Text> {formatToUTCTime(duration)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  }
});

export default TaskInfo;
