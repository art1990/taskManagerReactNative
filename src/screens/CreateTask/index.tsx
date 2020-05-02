// react
import React from "react";
import { View } from "react-native";
// redux
import { create } from "../../redux/task";
// components
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";
// hooks
import useCreateTask from "../../hooks/task/useCreateTask";
// styles
import Styles from "../../assets/styles";

const CreateTask: React.FC = () => {
  const { onCreatePress } = useCreateTask();

  return (
    <View style={[Styles.wrapper]}>
      <Title text="New Task" />
      <TaskForm onSubmit={onCreatePress} />
    </View>
  );
};

export default CreateTask;
