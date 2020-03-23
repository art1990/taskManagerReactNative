// react
import React from "react";
import { View, Text } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentTaskData } from "../../redux/task/selectors";
import { update } from "../../redux/task";
// components
import EditTaskForm from "../../components/forms/EditTaskForm";
// routes
import { Routes } from "../../navigation/routes";

export default ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { id } = route?.params;
  const taskData = useSelector(selectCurrentTaskData(id));

  const onUpdateTask = data => {
    dispatch(update.request({ ...data, id }));
    navigation.navigate(Routes.TASKS_LIST);
  };

  return (
    <View>
      <Text>Edit tsk</Text>
      <EditTaskForm taskData={taskData} onSubmit={onUpdateTask} />
    </View>
  );
};
