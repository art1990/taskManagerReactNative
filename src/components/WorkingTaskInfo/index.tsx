// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import Timer from "../Timer";
// react-native-papper
import { IconButton } from "react-native-paper";
// icons
import { MaterialIcons } from "@expo/vector-icons";
// constants
import { Colors } from "../../assets/styles/constants";
// styles
import Styles, { paddingHorizontal } from "../../assets/styles";

interface IWorkingTaskInfoProps {
  title: string;
  startTime: number;
  duration: number;
  onCreateTask: () => void;
  style?: {};
}

const WorkingTaskInfo: React.FC<IWorkingTaskInfoProps> = ({
  title,
  style,
  startTime,
  duration,
  onCreateTask,
}) => (
  <View style={[Styles.rowSpaceBetween, styles.container]}>
    <Text style={styles.title}>{title}</Text>
    <Timer startTime={startTime} duration={duration} />
    <IconButton
      style={styles.button}
      icon={() => <MaterialIcons name="pause-circle-filled" size={20} />}
      onPress={onCreateTask}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    backgroundColor: Colors.taskInfoBGColor,
    paddingHorizontal,
    position: "relative",
    marginBottom: -25,
    marginHorizontal: -paddingHorizontal,
  },
  button: {
    marginRight: -5,
  },
  title: {
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 21,
  },
});

export default WorkingTaskInfo;
