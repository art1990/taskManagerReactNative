// react
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentTaskData } from "../../redux/task/selectors";
import { resume } from "../../redux/task";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
import TaskField from "../components/TaskField";
import Button from "../../components/Button";
// constants
import { Routes } from "../../navigation/routes";
import { Colors } from "../../assets/styles/constants";

interface ITaskView {
  task: any;
  route: any;
  navigation: any;
}

const ViewTask: React.FC<ITaskView> = ({ route, navigation }) => {
  const { id } = route?.params;

  const dispatch = useDispatch();
  const task: any = useSelector(selectCurrentTaskData(id));

  const onEditPress = () => {
    navigation.navigate(Routes.EDIT_TASK, { id });
  };

  const onResumePress = () => {
    const taskData = { ...task, navigation };
    dispatch(resume.request(taskData));
  };

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
  const { title, project, startTaskTime, endTime, duration, file } = task;
  return (
    <View style={styles.container}>
      <Title text="Task" iconButtonList={iconButtonList} />
      <TaskField title="Title" text={title} />
      <TaskField title="Project" text={project} />
      <View style={styles.timeSection}>
        <TaskField title="Start time" text={startTaskTime} isTime />
        <TaskField title="End time" text={endTime} isTime />
      </View>
      <TaskField title="Duration" text={duration} isTime />
      {file && <TaskField title="Added file" text={file.name} />}
      <Button
        mode="text"
        style={styles.buttonContainer}
        labelStyle={styles.buttonLabel}
        onPress={onRemovePress}
      >
        Delete task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  timeSection: {
    flexDirection: "row",
    flex: 0,
    justifyContent: "space-between"
  },
  buttonContainer: {
    alignSelf: "flex-start"
  },
  buttonLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.error
  }
});

export default ViewTask;
