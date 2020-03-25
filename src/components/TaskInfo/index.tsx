// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// react-native-paper
import { IconButton } from "react-native-paper";
// utils
import { formatToUTCTime } from "../../utils/date";
// styles
import Styles from "../../assets/styles";
// assets
import Completed from "../../assets/img/icons/complete.svg";
import Resume from "../../assets/img/icons/resume.svg";

export interface ITaskInfo {
  title: string;
  project: string;
  duration: number;
  isCompleted?: boolean;
  isPaused?: boolean;
  onResumePress: () => void;
}

const TaskInfo: React.FC<ITaskInfo> = ({
  title,
  project,
  duration,
  isCompleted,
  isPaused,
  onResumePress
}) => {
  const size = 22;

  return (
    <View style={[Styles.rowSpaceBetween, styles.container]}>
      <View style={Styles.rowSpaceBetween}>
        <Text>title: {title} </Text>
        <Text>project: {project}</Text>
      </View>
      <Text> {formatToUTCTime(duration)}</Text>
      {isCompleted ? (
        <Completed width={size} height={size} />
      ) : (
        isPaused && (
          <IconButton
            icon={() => <Resume width={size} heigth={size} />}
            onPress={onResumePress}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  iconContainer: {
    flexDirection: "row",
    flex: 0
  }
});

export default TaskInfo;
