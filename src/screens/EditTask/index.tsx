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
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";
// sections
import Time from "../sections/Time";
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
  } = useSelector(selectCurrentTaskData(id));

  const onUpdateTask = data => {
    dispatch(update.request({ ...data, id }));
    navigation.navigate(Routes.TASKS_LIST);
  };

  const removeTaskAndNavigate = useCallback(() => {
    dispatch(remove.request({ id }));
    navigation.navigate(Routes.TASKS_LIST);
  }, [id]);

  const timeProps = { startTaskTime, endTime, duration };

  return (
    <View>
      <Title
        text="Edit task"
        buttonText="Delete task"
        buttonAction={removeTaskAndNavigate}
      />
      <TaskForm isEditing formData={formData} onSubmit={onUpdateTask}>
        <Time {...timeProps} />
      </TaskForm>
    </View>
  );
};
