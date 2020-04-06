// react
import React from "react";
import { View } from "react-native";
// redux
import { create } from "../../redux/task";
import { useDispatch } from "react-redux";
// components
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";
// styles
import Styles from "../../assets/styles";
// types
import { ICreateTaskProps } from "../../types";

const CreateTask: React.FC<ICreateTaskProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const onStartTask = (data) => {
    dispatch(
      create.request({
        ...data,
        navigation,
      })
    );
  };

  return (
    <View style={[Styles.wrapper]}>
      <Title text="New Task" />
      <TaskForm onSubmit={onStartTask} />
    </View>
  );
};

export default CreateTask;
