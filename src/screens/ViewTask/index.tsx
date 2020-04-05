// react
import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
// redux
import { useSelector } from "react-redux";
import { selectCurrentTaskData } from "../../redux/task/selectors";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
import TaskField from "../components/TaskField";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
// sections
import Time from "../sections/Time";
// constants
import { Colors } from "../../assets/styles/constants";
// hooks
import useTaskAction from "../../hooks/useTaskAction";
// types
import { ITaskViewProps } from "../../types";

const ViewTask: React.FC<ITaskViewProps> = ({ route }) => {
  const { id } = route?.params;
  const {
    onEditPress,
    onResumePress,
    onMarkAsCompletedPress,
  } = useTaskAction();

  const task: any = useSelector(selectCurrentTaskData(id));

  const onRemovePress = () => {
    Alert.alert("hahah");
  };

  const EditIconButton = (
    <IconButton key={1} icon="edit" onPress={onEditPress} />
  );
  const ResumeIconButton = (
    <IconButton key={2} icon="resume" onPress={onResumePress} />
  );

  const iconButtonList = [EditIconButton, ResumeIconButton];
  const {
    title,
    project,
    startTaskTime,
    endTime,
    duration,
    file,
    isCompleted,
  } = task;
  return (
    <View style={styles.container}>
      <Title
        text="Task"
        iconButtonList={iconButtonList}
        isCompleted={isCompleted}
      />
      <TaskField title="Title" text={title} />
      <TaskField title="Project" text={project} />
      <Time
        startTaskTime={startTaskTime}
        endTime={endTime}
        duration={duration}
      />
      {file && <TaskField title="Added file" text={file.name} />}
      <Button
        mode="text"
        style={styles.buttonContainer}
        labelStyle={styles.buttonLabel}
        onPress={onRemovePress}
      >
        Delete task
      </Button>
      {!isCompleted && (
        <Button onPress={onMarkAsCompletedPress}>Mark as Completed</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  buttonLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.error,
  },
});

export default ViewTask;
