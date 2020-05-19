// react
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
import TaskField from "../components/TaskField";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import Tags from "../../components/Tags";
// sections
import Time from "../sections/Time";
// hooks
import useTaskNavigation from "../../hooks/task/useTaskNavigation";
import useUpdateTask from "../../hooks/task/useUpdateTask";
import useRemoveTask from "../../hooks/task/useRemoveTask";
// redux
import { useSelector } from "react-redux";
import { selectCurrentTaskData, selectMeta } from "../../redux/task/selectors";
// assets
import Styles from "../../assets/styles";
import { Colors } from "../../assets/styles/constants";

interface ITaskViewProps {
  route: { params: { [key: string]: string } };
  navigation: any;
}

const ViewTask: React.FC<ITaskViewProps> = ({ route }) => {
  const { id } = route?.params;
  const { onResumePress, onMarkAsCompletedPress } = useUpdateTask();
  const { toEdit } = useTaskNavigation();
  const { onRemovePress } = useRemoveTask();

  const task = useSelector(selectCurrentTaskData(id));
  const { isLoading } = useSelector(selectMeta);

  const EditIconButton = <IconButton key={1} icon="edit" onPress={toEdit} />;
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
    isPaused,
  } = task || {};

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
          iconButtonList={isPaused && iconButtonList}
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
            {task.tags && (
              <TaskField title="Tags">
                <Tags tags={task.tags} style={styles.tags} />
              </TaskField>
            )}
            {file && <TaskField title="Added file" text={file.name} />}
            {isPaused && (
              <Button
                mode="text"
                style={styles.buttonContainer}
                labelStyle={styles.buttonLabel}
                onPress={() => onRemovePress(undefined, true)}
              >
                Delete task
              </Button>
            )}
          </>
        )}
      </View>
      {!isCompleted && isPaused && (
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
  tags: {
    marginLeft: -8,
  },
});

export default ViewTask;
