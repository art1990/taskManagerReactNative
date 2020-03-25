// react
import React, { useCallback } from "react";
import { View, Text } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectTaskFormData,
  selectCurrentTaskData
} from "../../redux/task/selectors";
import { update, remove } from "../../redux/task";
// components
import EditTaskForm from "../../components/forms/EditTaskForm";
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";
// routes
import { Routes } from "../../navigation/routes";

export default ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { id } = route?.params;
  const formData = useSelector(selectTaskFormData(id));
  const {
    startTaskTime,
    endTime,
    duration,
    isCompleted,
    isPaused
  } = useSelector(selectCurrentTaskData);

  const onUpdateTask = data => {
    dispatch(update.request({ ...data, id }));
    navigation.navigate(Routes.TASKS_LIST);
  };

  const removeTaskAndNavigate = useCallback(() => {
    dispatch(remove.request({ id }));
    navigation.navigate(Routes.TASKS_LIST);
  }, [id]);

  return (
    <View>
      <Title
        text="Edit task"
        buttonText="Delete task"
        buttonAction={removeTaskAndNavigate}
      />
      <TaskForm isEditing formData={formData} onSubmit={onUpdateTask} />
    </View>
  );
};
