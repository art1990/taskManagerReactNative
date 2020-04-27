// react
import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
// redux
import { useSelector } from "react-redux";
import { selectCurrentTaskData, selectMeta } from "../../redux/task/selectors";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
import TaskField from "../components/TaskField";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
// sections
import Time from "../sections/Time";
// hooks
import useTaskAction from "../../hooks/useTaskAction";
// assets
import Styles from "../../assets/styles";
import { Colors } from "../../assets/styles/constants";
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
  const { isLoading } = useSelector(selectMeta);

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
    <View
      style={[
        Styles.wrapper,
        styles.container,
        !isCompleted && styles.spaceBetween,
      ]}
    >
      <View>
        <Title
          text="Task"
          iconButtonList={iconButtonList}
          isCompleted={isCompleted}
        />
        <Modal visible={isLoading} />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
          </>
        )}
      </View>
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
    backgroundColor: Colors.white,
  },
  spaceBetween: {
    justifyContent: "space-between",
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
