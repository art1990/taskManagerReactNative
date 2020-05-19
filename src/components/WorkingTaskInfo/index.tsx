// react
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
// types
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface IWorkingTaskInfoProps {
  title: string;
  startTime: number;
  duration: number;
  onCreateTask: () => void;
  toView: () => void;
  style?: typeStyleObj;
}

const WorkingTaskInfo: React.FC<IWorkingTaskInfoProps> = ({
  title,
  startTime,
  duration,
  onCreateTask,
  toView,
}) => (
  <TouchableOpacity onPress={toView}>
    <View
      testID="workingTask"
      style={[Styles.rowSpaceBetween, styles.container]}
    >
      <Text style={styles.title}>{title}</Text>
      <Timer startTime={startTime} duration={duration} />
      <IconButton
        testID="workingPauseBtn"
        style={styles.button}
        icon={() => <MaterialIcons name="pause-circle-filled" size={20} />}
        onPress={onCreateTask}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
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
