// react
import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
// react-native-papper
import { IconButton } from "react-native-paper";
// expo
import Swipeable from "react-native-gesture-handler/Swipeable";
// utils
import { formatToUTCTime } from "../../utils/date";
// styles
import Styles from "../../assets/styles";
// assets
import TrashIcon from "../../assets/img/icons/trash.svg";
import PencilIcon from "../../assets/img/icons/pencil.svg";

interface ITaskInfo {
  title: string;
  project: string;
  duration: number;
  background?: string;
  onRemovePress: () => void;
  onEditPress: () => void;
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

const TaskInfo: React.FC<ITaskInfo> = ({
  title,
  project,
  duration,
  background,
  onRemovePress,
  onEditPress
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
    <View
      style={[
        Styles.rowSpaceBetween,
        styles.container,
        background && { backgroundColor: background }
      ]}
    >
      <View style={Styles.rowSpaceBetween}>
        <Text>title: {title} </Text>
        <Text>project: {project}</Text>
      </View>
      <Text> {formatToUTCTime(duration)}</Text>
    </View>
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

export default TaskInfo;
