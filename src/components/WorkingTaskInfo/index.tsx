// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import Timer from "../Timer";
import { IconButton } from "react-native-paper";
// icons
import { MaterialIcons } from "@expo/vector-icons";
// constants
import { Colors } from "../../assets/styles/constants";

interface IWorkingTaskInfo {
  title: string;
  startTime: number;
  onCreateTask: () => void;
}

const WorkingTaskInfo: React.FC<IWorkingTaskInfo> = ({
  title,
  startTime,
  onCreateTask
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Timer startTime={startTime} />
    <IconButton
      icon={() => <MaterialIcons name="pause-circle-filled" size={20} />}
      onPress={onCreateTask}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
