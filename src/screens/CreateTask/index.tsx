// react
import React, { useState } from "react";
import { View, Text } from "react-native";
// redux
import { start } from "../../redux/task";
import { useDispatch } from "react-redux";
// components
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";
// date-fns
import { getUnixTime } from "date-fns";
// constants
import { Routes } from "../../navigation/routes";

const CreateTask: React.FC = ({ navigation }) => {
  const [file, setFile] = useState<object>(null);

  const dispatch = useDispatch();

  const onStartTask = data => {
    dispatch(
      start.request({
        ...data,
        startTime: getUnixTime(new Date()),
        file
      })
    );
    navigation.navigate(Routes.TASKS_LIST);
  };

  return (
    <View>
      <Title text="New Task" />
      <TaskForm onSubmit={onStartTask} />
    </View>
  );
};

export default CreateTask;
