// react
import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
// react-native-papper
import { IconButton } from "react-native-paper";
// expo
import Swipeable from "react-native-gesture-handler/Swipeable";
// compoents
import TaskInfo from "../../components/TaskInfo";
// iterface
import { ITaskInfo } from "../../components/TaskInfo";
// assets
import TrashIcon from "../../assets/img/icons/trash.svg";
import PencilIcon from "../../assets/img/icons/pencil.svg";

interface ITaskSwipeableInfo extends ITaskInfo {
  onRemovePress: () => void;
  onEditPress: () => void;
  onResumePress: () => void;
}

const RightActions = ({ progress, dragX, onEditPress, onRemovePress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  return (
    <Animated.View style={[styles.iconContainer, { transform: [{ scale }] }]}>
      <IconButton
        icon={() => <TrashIcon width={20} height={20} />}
        onPress={onRemovePress}
      />
      <IconButton
        icon={() => <PencilIcon width={20} height={20} />}
        onPress={onEditPress}
      />
    </Animated.View>
  );
};

const TaskSwipeableInfo: React.FC<ITaskSwipeableInfo> = ({
  title,
  project,
  duration,
  isPaused,
  isCompleted,
  onRemovePress,
  onEditPress,
  onResumePress
}) => (
  <Swipeable
    renderRightActions={(progress, dragX) => (
      <RightActions
        progress={progress}
        dragX={dragX}
        onEditPress={onEditPress}
        onRemovePress={onRemovePress}
      />
    )}
  >
    <TaskInfo
      title={title}
      project={project}
      duration={duration}
      isPaused={isPaused}
      isCompleted={isCompleted}
      onResumePress={onResumePress}
    />
  </Swipeable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  iconContainer: {
    flexDirection: "row",
    flex: 0
  }
});

export default TaskSwipeableInfo;
