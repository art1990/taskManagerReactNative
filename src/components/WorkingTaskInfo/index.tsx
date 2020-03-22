// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import Timer from "../Timer";
// constants
import { Colors } from "../../assets/styles/constants";

interface IWorkingTaskInfo {
  title: string;
  startTime: number;
}

const WorkingTaskInfo: React.FC<IWorkingTaskInfo> = ({ title, startTime }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Timer startTime={startTime} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 32,

    backgroundColor: Colors.workingTaskBGColor
  },
  title: {
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 21
  }
});

export default WorkingTaskInfo;
