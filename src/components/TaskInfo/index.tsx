// react
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// react-native-paper
import { IconButton } from "react-native-paper";
// utils
import { formatToUTCTime } from "../../utils/date";
// assets
import Styles, { paddingHorizontal } from "../../assets/styles";
// @ts-ignore
import Completed from "../../assets/img/icons/complete.svg";
// @ts-ignore
import Resume from "../../assets/img/icons/resume.svg";
// types
import { ITaskInfoProps } from "./types";

const TaskInfo: React.FC<ITaskInfoProps> = ({
  title,
  project,
  startTaskTime,
  duration,
  isCompleted,
  isPaused,
  onResumePress,
  toView,
  style,
}) => {
  const size = 22;
  const timeText = isPaused
    ? formatToUTCTime(duration)
    : "start: " + formatToUTCTime(startTaskTime);

  return (
    <TouchableOpacity testID="task" onPress={toView}>
      <View style={[Styles.rowSpaceBetween, styles.container, style]}>
        <View style={[Styles.rowSpaceBetween, styles.titleWithProjectSection]}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            tit# {title}{" "}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            proj# {project}
          </Text>
        </View>
        <View style={styles.durationWithIconSection}>
          <Text> {timeText}</Text>
          {isCompleted ? (
            <Completed width={size} height={size} />
          ) : (
            isPaused && (
              <IconButton
                testID="resumeBtn"
                icon={() => <Resume width={size} heigth={size} />}
                onPress={onResumePress}
                style={styles.button}
              />
            )
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal,
  },
  button: {
    position: "absolute",
    right: -13,
  },
  iconContainer: {
    flexDirection: "row",
    flex: 0,
  },
  durationWithIconSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWithProjectSection: {
    width: "72%",
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  text: { flexShrink: 1 },
});

export default TaskInfo;
