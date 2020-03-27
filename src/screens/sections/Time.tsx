// react
import React from "react";
import { View, StyleSheet } from "react-native";
// components
import TaskField from "../../screens/components/TaskField";

interface ITimeSection {
  startTaskTime: number;
  endTime: number;
  duration: number;
}

const TimeSection: React.FC<ITimeSection> = ({
  startTaskTime,
  endTime,
  duration
}) => (
  <>
    <View style={styles.timeSection}>
      <TaskField title="Start time" text={startTaskTime} isTime />
      <TaskField title="End time" text={endTime} isTime />
    </View>
    <TaskField title="Duration" text={duration} isTime />
  </>
);

const styles = StyleSheet.create({
  timeSection: {
    flexDirection: "row",
    flex: 0,
    justifyContent: "space-between"
  }
});

export default TimeSection;
