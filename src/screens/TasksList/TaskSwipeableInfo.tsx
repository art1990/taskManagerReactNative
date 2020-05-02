// react
import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
// react-native-papper
import { IconButton } from "react-native-paper";
// expo
import Swipeable from "react-native-gesture-handler/Swipeable";
// compoents
import TaskInfo from "../../components/TaskInfo";
// assets
import TrashIcon from "../../assets/img/icons/trash.svg";
import PencilIcon from "../../assets/img/icons/pencil.svg";
// types
import { ITaskInfoProps } from "../../components/TaskInfo/types";

export interface ITaskSwipeableInfoProps extends ITaskInfoProps {
  onRemovePress: () => void;
  onEditPress: () => void;
  onResumePress: () => void;
}

const RightActions = ({ progress, dragX, onEditPress, onRemovePress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const size = 20;

  return (
    <Animated.View
      style={[styles.iconContainer, { transform: [{ scale }] }, styles.swipe]}
    >
      <IconButton
        icon={() => <TrashIcon width={size} height={size} />}
        onPress={onRemovePress}
      />
      <IconButton
        icon={() => <PencilIcon width={size} height={size} />}
        onPress={onEditPress}
      />
    </Animated.View>
  );
};

const TaskSwipeableInfo: React.FC<ITaskSwipeableInfoProps> = ({
  title,
  project,
  duration,
  isPaused,
  isCompleted,
  onRemovePress,
  onEditPress,
  onResumePress,
  toView,
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
      toView={toView}
    />
  </Swipeable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  iconContainer: {
    flexDirection: "row",
    flex: 0,
    alignItems: "center",
  },
  swipe: {
    backgroundColor: "red",
  },
});

export default TaskSwipeableInfo;
