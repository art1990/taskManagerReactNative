// react
import React from "react";
import { View } from "react-native";
// redux
import { create } from "../../redux/task";
import { useDispatch } from "react-redux";
// components
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";

interface ICreateTask {
  navigation: any;
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const dispatch = useDispatch();

  const onStartTask = data => {
    dispatch(
      create.request({
        ...data,
        navigation
      })
    );
  };

  return (
    <View>
      <Title text="New Task" />
      <TaskForm onSubmit={onStartTask} />
    </View>
  );
};

export default CreateTask;
