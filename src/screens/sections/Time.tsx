// react
import React from "react";
import { View, StyleSheet } from "react-native";
// components
import TaskField from "../../screens/components/TaskField";
// types
import { ITimeSectionProps } from "../../types";

const TimeSection: React.FC<ITimeSectionProps> = ({
  startTaskTime,
  endTime,
  duration,
}) => (
  <>
    <View style={styles.timeSection}>
      <TaskField title="Start time" hasMounth text={startTaskTime} isTime />
      <TaskField title="End time" hasMounth text={endTime} isTime />
    </View>
    <TaskField title="Duration" text={duration} isTime />
  </>
);

const styles = StyleSheet.create({
  timeSection: {
    flexDirection: "row",
    flex: 0,
    justifyContent: "space-between",
  },
});

export default TimeSection;
